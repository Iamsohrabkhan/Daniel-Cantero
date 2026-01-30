
import { motion, useInView } from "framer-motion"
import { useRef, useMemo } from "react"

export default function TextRevealAnimation({
  // Text Configuration
  text = "Animated Text",
  textColor = "#000000",
  optionalColor = "#000000",
  fontSize = "40px",
  fontWeight = "bold",
  lineHeight = "0.8em",
  letterSpacing = "-0.02em",
  
  // Animation Settings
  animationDirection = "bottom", // "bottom" or "top"
  animationOrigin = "start", // "start", "middle", or "end"
  delay = 0,
  letterDelay = 0.02,
  letterDuration = 2,
  letterDistance = 100,
  rotateChar = -80,
  
  // Visual Settings
  numCopies = 7, // Number of text lines
  gap = 0, // Gap between lines
  showSymbol = false,
  symbol = "𔓘",
  uppercase = false,
  
  // Behavior
  replay = false, // Animation replays on scroll
  loop = false, // Animation loops infinitely
  repeatType = "mirror", // "mirror", "reverse", or "loop"
  
  // Container styling
  padding = "0px",
  style = {},
}) {
  const ref = useRef(null)
  
  // Detect when the component is in view
  const isInView = useInView(ref, {
    once: !replay, // If replay is true, animation triggers every time it comes into view
    amount: 0.1, // Trigger when 10% of component is visible
  })

  // Convert text to uppercase if needed
  const processedText = useMemo(() => {
    return uppercase ? text.toUpperCase() : text
  }, [text, uppercase])

  // Split text into individual characters
  const characters = useMemo(() => {
    return processedText.split("")
  }, [processedText])

  // Calculate the animation order based on origin setting
  const animationIndices = useMemo(() => {
    const textLength = characters.length
    let indices = Array(textLength).fill(0).map((_, i) => i)

    if (animationOrigin === "start") {
      // Animate from left to right
      return indices
    } else if (animationOrigin === "end") {
      // Animate from right to left
      return indices.reverse()
    } else if (animationOrigin === "middle") {
      // Animate from middle outward
      const middle = Math.floor(textLength / 2)
      const result = new Array(textLength)
      result[0] = middle

      let leftPos = middle - 1
      let rightPos = middle + 1
      let index = 1

      // Alternate between right and left
      while (leftPos >= 0 || rightPos < textLength) {
        if (rightPos < textLength) {
          result[index++] = rightPos++
        }
        if (leftPos >= 0) {
          result[index++] = leftPos--
        }
      }

      // Map original positions to animation order
      const orderMap = {}
      result.forEach((pos, i) => {
        orderMap[pos] = i
      })

      return indices.map((i) => orderMap[i])
    }

    return indices
  }, [characters.length, animationOrigin])

  // Animation variants for each letter
  const letterVariants = {
    hidden: {
      // Starting position (off-screen)
      y: animationDirection === "top" 
        ? -letterDistance * 2.9 
        : letterDistance * 2.9,
      rotateX: rotateChar,
      opacity: 0,
    },
    visible: (customData) => {
      const { charIndex, lineIndex } = customData
      
      // For bottom direction, reverse the line order for stagger effect
      const adjustedLineIndex = animationDirection === "bottom"
        ? numCopies - 1 - lineIndex
        : lineIndex

      return {
        // End position (normal)
        y: 0,
        rotateX: 0,
        opacity: 1,
        transition: {
          delay: charIndex * letterDelay + delay + adjustedLineIndex * 0.1,
          duration: letterDuration,
          ease: [0.6, 0.4, 0, 1], // Custom easing curve
          repeat: loop ? Infinity : 0,
          repeatType: repeatType,
          repeatDelay: 3.5,
        },
      }
    },
  }

  // Determine what character to display
  const getCharToDisplay = (lineIndex, char) => {
    if (lineIndex === 0) {
      // First line shows actual text
      return char === " " ? "\u00A0" : char // Non-breaking space
    }
    // Other lines show symbol or duplicate text
    return char === " " ? "\u00A0" : showSymbol ? symbol : char
  }

  // Container styles
  const containerStyle = {
    ...style,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: animationDirection !== "bottom" ? "flex-start" : "flex-end",
    padding: padding,
    overflow: "hidden",
    width: "100%",
  }

  // Text line styles
  const textLineStyle = {
    fontSize: fontSize,
    fontWeight: fontWeight,
    lineHeight: lineHeight,
    letterSpacing: letterSpacing,
    position: "relative",
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    width: "100%",
    marginBottom: gap > 0 ? `${gap}px` : 0,
    perspective: "1000px",
    transformStyle: "preserve-3d",
  }

  // Individual character styles
  const spanStyle = {
    position: "relative",
    display: "inline-block",
    transformStyle: "preserve-3d",
    perspective: "500px",
    transformOrigin: "center bottom",
  }

  return (
    <motion.div style={containerStyle} ref={ref}>
      {/* Render multiple copies of the text */}
      {Array.from({ length: numCopies }, (_, lineIndex) => (
        <motion.div
          key={lineIndex}
          style={{
            ...textLineStyle,
            color: lineIndex === 0 ? textColor : optionalColor,
          }}
        >
          {/* Render each character */}
          {characters.map((char, charIndex) => (
            <motion.span
              key={`${lineIndex}-${charIndex}`}
              custom={{ 
                charIndex: animationIndices[charIndex], 
                lineIndex 
              }}
              variants={letterVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={spanStyle}
            >
              {getCharToDisplay(lineIndex, char)}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </motion.div>
  )
}
