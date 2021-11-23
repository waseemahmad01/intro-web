import React from "react";

import { Button } from "@material-ui/core";

import { useStyles } from "./customButtonStyle";

export const CustomButton = ({ children, variant, styleProps, onClick }) => {
	const classes = useStyles();
	return (
		<Button
			disableRipple
			size="large"
			style={styleProps}
			variant="contained"
			className={classes[variant]}
			onClick={onClick}
		>
			{children}
		</Button>
	);
};
