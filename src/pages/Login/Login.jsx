import React from "react";
import { Header } from "../../components/header/Header";
import { Grid, Typography, Button } from "@material-ui/core";
import image from "../../assets/index";
import { useStyles } from "./loginStyle";
import { Link } from "react-router-dom";
export const Login = () => {
	const classes = useStyles();

	return (
		<>
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				className={classes.container}
			>
				<Header background="rgba(0,0,0,0.16)" />
				<Grid item>
					<Grid
						container
						className={classes.loginContainer}
						justifyContent="center"
						direction="column"
						spacing={1}
						alignItems="center"
					>
						<Grid item>
							<img
								src={image.logo2x}
								className={classes.logo}
								alt="company-logo"
							/>
						</Grid>
						<Grid item>
							<Button
								startIcon={
									<img
										src={image.googleIcon}
										className={classes.googleIcon}
										alt=""
									/>
								}
								endIcon={
									<img
										src={image.facebook}
										alt=""
										style={{ visibility: "hidden" }}
									/>
								}
								className={classes.googleButton}
								variant="contained"
							>
								Sign in with Google
							</Button>
						</Grid>
						<Grid item>
							<Button
								startIcon={
									<img src={image.facebook} className={classes.fbIcon} alt="" />
								}
								endIcon={
									<img
										src={image.facebook}
										alt=""
										style={{ visibility: "hidden" }}
									/>
								}
								className={classes.facebookButton}
								variant="contained"
							>
								Sign in with Facebook
							</Button>
						</Grid>
						<Grid item>
							<Typography className={classes.body1} variant="body1">
								Or Continue with your
								<Link to="/signin" className={classes.anchor}>
									Phone Number?
								</Link>
							</Typography>
						</Grid>
						<Grid item>
							<Typography className={classes.body2} variant="body2">
								By Signing Up for intro, you agree to our Terms of service.
								Learn how we process your data in our
								<span className={classes.anchor2}>Privacy Policy?</span>
								and
								<span className={classes.anchor2}>Cookie Policy.</span>
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};
