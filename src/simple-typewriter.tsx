import React, { useState, useEffect } from "react";

interface TypeWriterProps {
	text: string[],
	typeSpeed?: number,
	deleteSpeed?: number,
	delay?: number,
	blinkingSpeed?: number,
	cursor?: boolean,
	cursorStyle?: string,
	color?: string,
	fontSize?: number | string,
	loop?: boolean,
	reverse?: boolean,
	styles?: React.CSSProperties,
}


const SimpleTypeWriter: React.FC<TypeWriterProps> = ({ typeSpeed = 50, deleteSpeed = 100, delay = 2500, blinkingSpeed = 300, cursor = true, cursorStyle = "|", color = "black", fontSize = '20px', loop = false, reverse = false, styles = {}, text, }) => {

	const defaultStyles: React.CSSProperties = {
		color,
		fontSize,
		whiteSpace: "pre",
		...styles,
	};

	const [textToShow, setTextToShow] = useState("");
	const [showCursor, setShowCursor] = useState(false);

	useEffect(() => {
		startTypeWriter();
		startCursorBlinking();
	}, [])

	const startCursorBlinking = async () => {
		for (let idx = 0; idx < 1000000; idx++) {
			setShowCursor(prev => !prev);
			await sleep(blinkingSpeed);
		}

	}

	const sleep = (millisecond: number) => {
		return new Promise(resolve => setTimeout(resolve, millisecond));
	}

	const startTypeWriter = async () => {
		for (let i = 0; i < text.length; i++) {
			setTextToShow("");
			for (let idx = 0; idx < text[i].length; idx++) {
				setTextToShow(prev => prev + text[i][idx]);
				await sleep(typeSpeed);
			}
			await sleep(delay);
			if (reverse) {
				for (let idx = text[i].length - 1; idx >= 0; idx--) {
					setTextToShow(prev => prev.substring(0, idx));
					await sleep(deleteSpeed);
				}
				await sleep(delay);
			}
		}

		if (loop) {
			startTypeWriter();
		}


	}

	return (<div style={defaultStyles}>
		<span style={{ textAlign: "left" }}>{textToShow + `${!cursor ? "" : showCursor ? cursorStyle : ""}`}</span>
	</div>);
}


export default SimpleTypeWriter;
