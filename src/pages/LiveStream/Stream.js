import React, { useState } from "react";
import { useStyles } from "./streamStyles";
import {
	Grid,
	Typography,
	TextField,
	Button,
	useTheme,
	useMediaQuery,
	IconButton,
	Dialog,
} from "@material-ui/core";
import image from "../../assets/index";
import {
	Block,
	ReportProblemOutlined as WarningIcon,
} from "@material-ui/icons";
import { StreamerBox } from "../../components/ViewBox/StreamerBox";
import { Close } from "@material-ui/icons";
// import { ViewerBox } from "../../components/ViewBox/ViewerBox";
// import { Gift } from "../../components/Gift/Gift";

export const Stream = () => {
	const classes = useStyles();

	const [guestWindow, setGuestWindow] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [isWaiting, setIsWaiting] = useState(false);
	const [exit, setExit] = useState(false);
	const [blueWindow, setBlueWindow] = useState(false);
	const [isStarted, setIsStarted] = useState(false);
	const theme = useTheme();
	const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const lgScreen = useMediaQuery(theme.breakpoints.down(1680));
	return (
		<Grid
			container
			className={classes.mainContainer}
			justifyContent="space-between"
		>
			<Grid item container direction="column" className={classes.left}>
				<Grid item>
					<Typography className={classes.username} variant="h4">
						Jhondoe_00
					</Typography>
				</Grid>
				<Grid item container>
					<Grid item container>
						<Grid item>
							<div className={classes.statsContainer}>
								<img
									src={image.gem}
									className={classes.gemIcon}
									alt="eye-icon"
								/>
								<span className={classes.count}>3.4k</span>
							</div>
						</Grid>
						<Grid item>
							<div className={classes.statsContainer}>
								<img
									src={image.eyeBlue}
									className={classes.eyeIcon}
									alt="eye-icon"
								/>
								<span className={classes.count}>558</span>
							</div>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<div className={classes.streamContainer}>
						<img src={image.streamer} alt="" />
						{isStarted ? undefined : (
							<div className={classes.description}>
								<TextField
									classes={{ root: classes.fieldRoot }}
									variant="standard"
									className={classes.textField}
									placeholder="Add Description"
									inputProps={{ className: classes.input }}
								/>
								<Button
									className={classes.startButton}
									variant="contained"
									color="primary"
									onClick={() => setIsStarted(true)}
								>
									Start
								</Button>
							</div>
						)}
						{guestWindow ? (
							<div className={classes.guestBox}>
								<div
									style={{
										position: "relative",
										height: "100%",
										width: "100%",
									}}
								>
									<IconButton className={classes.closeButton}>
										<Close className={classes.closeIcon} />
									</IconButton>
									<img src={image.actor} alt="" />
								</div>
							</div>
						) : undefined}
						<IconButton
							onClick={() => setOpenDialog(true)}
							className={classes.warningButton}
						>
							<WarningIcon className={classes.warningIcon} />
						</IconButton>
						<Dialog open={openDialog} className={classes.dialog}>
							<Grid
								container
								direction="column"
								alignItems="center"
								className={classes.dialogContent}
							>
								<Grid item>
									<Typography className={classes.dialogTitle}>
										Report Stream
									</Typography>
								</Grid>
								<Grid item>
									<Typography className={classes.dialogSubtitle}>
										Are you sure you want to report this stream?
									</Typography>
								</Grid>
								<Grid item>
									<Button
										className={classes.reportButton}
										variant="contained"
										color="primary"
										onClick={() => setOpenDialog(false)}
									>
										Report
									</Button>
								</Grid>
								<Grid item>
									<Button
										className={classes.cancelButton}
										variant="outlined"
										color="primary"
										onClick={() => setOpenDialog(false)}
									>
										Cancel
									</Button>
								</Grid>
							</Grid>
						</Dialog>
						{/* waiting overlay */}
						{isWaiting ? (
							<Grid
								containaer
								justifyContent="center"
								alignItems="center"
								direction="column"
								className={classes.waitingOverly}
							>
								<Typography className={classes.overlyTitle}>
									Wait Please
								</Typography>
								<Typography className={classes.overlySubtitle}>
									You will be able to see the user's video once it is your turn
								</Typography>
							</Grid>
						) : undefined}
						{blueWindow ? (
							<Grid
								container
								direction="column"
								alignItems="center"
								className={classes.blueWindow}
							>
								<Grid item container>
									<IconButton
										onClick={() => setBlueWindow(false)}
										className={classes.closeButton}
									>
										<Close className={classes.closeIcon} />
									</IconButton>
								</Grid>
								<Grid
									item
									container
									justifyContent="center"
									alignItems="center"
									style={{ height: "100%" }}
								>
									<Typography className={classes.blueWindowText}>
										Ask your viewers to play!
									</Typography>
								</Grid>
							</Grid>
						) : undefined}
					</div>
				</Grid>
				<Grid
					item
					container
					alignItems="center"
					className={classes.warningContainer}
				>
					{isWaiting ? (
						<Grid container justifyContent="space-between" alignItems="center">
							<Typography className={classes.waitTitle}>
								{exit ? "Are you sure?" : "Wait Please"}
							</Typography>
							<Typography className={classes.waitSubtitle}>
								{exit
									? "Do you really want to get out of line?"
									: "You are in line for the next|date with silkysilk_00. Wait for	your turn to have fun with the user."}
							</Typography>
							<Grid item>
								{exit ? (
									<Grid container spacing={2}>
										<Grid item>
											<Button
												className={classes.exitSecondaryButton}
												variant="outlined"
												color="primary"
												onClick={() => setIsWaiting(false)}
											>
												Leave the line
											</Button>
										</Grid>
										<Grid item>
											<Button
												className={classes.exitSecondaryButton}
												variant="outlined"
												color="primary"
												onClick={() => setExit(false)}
											>
												Keep Waiting
											</Button>
										</Grid>
									</Grid>
								) : (
									<Button
										className={classes.exitButton}
										variant="outlined"
										color="primary"
										onClick={() => setExit(true)}
									>
										EXIT
									</Button>
								)}
							</Grid>
						</Grid>
					) : (
						<>
							<Block className={classes.block} />
							<Typography className={classes.warning} variant="h4">
								Don’t stream nudity or obscene/violent behavior. ever stream
								while driving or under unsafe conditions.
							</Typography>
						</>
					)}
				</Grid>
			</Grid>
			<Grid
				item
				container
				alignItems={smScreen ? undefined : "flex-end"}
				justifyContent={lgScreen ? "center" : "flex-start"}
				className={classes.utilityContainer}
			>
				<StreamerBox />
				{/* <Gift /> */}
				{/* <ViewerBox /> */}
			</Grid>
		</Grid>
	);
};
