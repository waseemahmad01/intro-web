import React from "react";
import { useStyles } from "./liveFilterStyles";
import { Grid, IconButton, Typography } from "@material-ui/core";
import image from "../../assets/index";

export const LiveFilter = () => {
	const classes = useStyles();
	return (
		<Grid
			container
			className={classes.container}
			justifyContent="center"
			spacing={3}
		>
			<Grid item className={classes.item}>
				<div className={classes.liveUser}>
					<img
						src={image.liveuser}
						className={classes.liveUserImage}
						alt="live-user"
					/>
					<div className={classes.userOverly}>
						<Grid container>
							<Grid
								item
								container
								justifyContent="space-between"
								alignItems="center"
							>
								<Grid item>
									<div className={classes.views}>
										<img src={image.eye} alt="eye-icon" />
										<span className={classes.viewCount}>3.4k</span>
									</div>
								</Grid>
							</Grid>
							<Grid item container className={classes.userInfoContainer}>
								<Grid item container justifyContent="space-between">
									<Typography className={classes.userInfo}>
										Jenna Green
									</Typography>
									<Typography className={classes.userInfo}>25</Typography>
								</Grid>
								<Grid item container style={{ width: "100%" }}>
									<Typography className={classes.userCity}>New York</Typography>
								</Grid>
							</Grid>
						</Grid>
					</div>
				</div>
			</Grid>
			<Grid item>
				<div className={classes.liveUser}>
					<img
						src={image.liveuser}
						className={classes.liveUserImage}
						alt="live-user"
					/>
					<div className={classes.userOverly}>
						<Grid container>
							<Grid
								item
								container
								justifyContent="space-between"
								alignItems="center"
							>
								<Grid item>
									<div className={classes.views}>
										<img src={image.eye} alt="eye-icon" />
										<span className={classes.viewCount}>3.4k</span>
									</div>
								</Grid>
							</Grid>
							<Grid item container className={classes.userInfoContainer}>
								<Grid item container justifyContent="space-between">
									<Typography className={classes.userInfo}>
										Jenna Green
									</Typography>
									<Typography className={classes.userInfo}>25</Typography>
								</Grid>
								<Grid item contianer style={{ width: "100%" }}>
									<Typography className={classes.userCity}>New York</Typography>
								</Grid>
							</Grid>
						</Grid>
					</div>
				</div>
			</Grid>
			<Grid item>
				<div className={classes.liveUser}>
					<img
						src={image.liveuser}
						className={classes.liveUserImage}
						alt="live-user"
					/>
					<div className={classes.userOverly}>
						<Grid container>
							<Grid
								item
								container
								justifyContent="space-between"
								alignItems="center"
							>
								<Grid item>
									<div className={classes.views}>
										<img src={image.eye} alt="eye-icon" />
										<span className={classes.viewCount}>3.4k</span>
									</div>
								</Grid>
								<Grid item>
									<IconButton className={classes.vsButton}>
										<span>vs</span>
									</IconButton>
								</Grid>
							</Grid>
							<Grid item container className={classes.userInfoContainer}>
								<Grid item container justifyContent="space-between">
									<Typography className={classes.userInfo}>
										Jenna Green
									</Typography>
									<Typography className={classes.userInfo}>25</Typography>
								</Grid>
								<Grid item contianer style={{ width: "100%" }}>
									<Typography className={classes.userCity}>New York</Typography>
								</Grid>
							</Grid>
						</Grid>
					</div>
				</div>
			</Grid>
			<Grid item>
				<div className={classes.liveUser}>
					<img
						src={image.liveuser}
						className={classes.liveUserImage}
						alt="live-user"
					/>
					<div className={classes.userOverly}>
						<Grid container>
							<Grid
								item
								container
								justifyContent="space-between"
								alignItems="center"
							>
								<Grid item>
									<div className={classes.views}>
										<img src={image.eye} alt="eye-icon" />
										<span className={classes.viewCount}>3.4k</span>
									</div>
								</Grid>
								<Grid item>
									<IconButton className={classes.vsButton}>
										<span>vs</span>
									</IconButton>
								</Grid>
							</Grid>
							<Grid item container className={classes.userInfoContainer}>
								<Grid item container justifyContent="space-between">
									<Typography className={classes.userInfo}>
										Jenna Green
									</Typography>
									<Typography className={classes.userInfo}>25</Typography>
								</Grid>
								<Grid item contianer style={{ width: "100%" }}>
									<Typography className={classes.userCity}>New York</Typography>
								</Grid>
							</Grid>
						</Grid>
					</div>
				</div>
			</Grid>
			<Grid item>
				<div className={classes.liveUser}>
					<img
						src={image.liveuser}
						className={classes.liveUserImage}
						alt="live-user"
					/>
					<div className={classes.userOverly}>
						<Grid container>
							<Grid
								item
								container
								justifyContent="space-between"
								alignItems="center"
							>
								<Grid item>
									<div className={classes.views}>
										<img src={image.eye} alt="eye-icon" />
										<span className={classes.viewCount}>3.4k</span>
									</div>
								</Grid>
								<Grid item>
									<IconButton className={classes.vsButton}>
										<span>vs</span>
									</IconButton>
								</Grid>
							</Grid>
							<Grid item container className={classes.userInfoContainer}>
								<Grid item container justifyContent="space-between">
									<Typography className={classes.userInfo}>
										Jenna Green
									</Typography>
									<Typography className={classes.userInfo}>25</Typography>
								</Grid>
								<Grid item contianer style={{ width: "100%" }}>
									<Typography className={classes.userCity}>New York</Typography>
								</Grid>
							</Grid>
						</Grid>
					</div>
				</div>
			</Grid>
			<Grid item>
				<div className={classes.liveUser}>
					<img
						src={image.liveuser}
						className={classes.liveUserImage}
						alt="live-user"
					/>
					<div className={classes.userOverly}>
						<Grid container>
							<Grid
								item
								container
								justifyContent="space-between"
								alignItems="center"
							>
								<Grid item>
									<div className={classes.views}>
										<img src={image.eye} alt="eye-icon" />
										<span className={classes.viewCount}>3.4k</span>
									</div>
								</Grid>
							</Grid>
							<Grid item container className={classes.userInfoContainer}>
								<Grid item container justifyContent="space-between">
									<Typography className={classes.userInfo}>
										Jenna Green
									</Typography>
									<Typography className={classes.userInfo}>25</Typography>
								</Grid>
								<Grid item contianer style={{ width: "100%" }}>
									<Typography className={classes.userCity}>New York</Typography>
								</Grid>
							</Grid>
						</Grid>
					</div>
				</div>
			</Grid>
			<Grid item>
				<div className={classes.liveUser}>
					<img
						src={image.liveuser}
						className={classes.liveUserImage}
						alt="live-user"
					/>
					<div className={classes.userOverly}>
						<Grid container>
							<Grid
								item
								container
								justifyContent="space-between"
								alignItems="center"
							>
								<Grid item>
									<div className={classes.views}>
										<img src={image.eye} alt="eye-icon" />
										<span className={classes.viewCount}>3.4k</span>
									</div>
								</Grid>
							</Grid>
							<Grid item container className={classes.userInfoContainer}>
								<Grid item container justifyContent="space-between">
									<Typography className={classes.userInfo}>
										Jenna Green
									</Typography>
									<Typography className={classes.userInfo}>25</Typography>
								</Grid>
								<Grid item contianer style={{ width: "100%" }}>
									<Typography className={classes.userCity}>New York</Typography>
								</Grid>
							</Grid>
						</Grid>
					</div>
				</div>
			</Grid>
			<Grid item>
				<div className={classes.liveUser}>
					<img
						src={image.liveuser}
						className={classes.liveUserImage}
						alt="live-user"
					/>
					<div className={classes.userOverly}>
						<Grid container>
							<Grid
								item
								container
								justifyContent="space-between"
								alignItems="center"
							>
								<Grid item>
									<div className={classes.views}>
										<img src={image.eye} alt="eye-icon" />
										<span className={classes.viewCount}>3.4k</span>
									</div>
								</Grid>
							</Grid>
							<Grid item container className={classes.userInfoContainer}>
								<Grid item container justifyContent="space-between">
									<Typography className={classes.userInfo}>
										Jenna Green
									</Typography>
									<Typography className={classes.userInfo}>25</Typography>
								</Grid>
								<Grid item contianer style={{ width: "100%" }}>
									<Typography className={classes.userCity}>New York</Typography>
								</Grid>
							</Grid>
						</Grid>
					</div>
				</div>
			</Grid>
			<Grid item>
				<div className={classes.liveUser}>
					<img
						src={image.liveuser}
						className={classes.liveUserImage}
						alt="live-user"
					/>
					<div className={classes.userOverly}>
						<Grid container>
							<Grid
								item
								container
								justifyContent="space-between"
								alignItems="center"
							>
								<Grid item>
									<div className={classes.views}>
										<img src={image.eye} alt="eye-icon" />
										<span className={classes.viewCount}>3.4k</span>
									</div>
								</Grid>
							</Grid>
							<Grid item container className={classes.userInfoContainer}>
								<Grid item container justifyContent="space-between">
									<Typography className={classes.userInfo}>
										Jenna Green
									</Typography>
									<Typography className={classes.userInfo}>25</Typography>
								</Grid>
								<Grid item contianer style={{ width: "100%" }}>
									<Typography className={classes.userCity}>New York</Typography>
								</Grid>
							</Grid>
						</Grid>
					</div>
				</div>
			</Grid>
			<Grid item>
				<div className={classes.liveUser}>
					<img
						src={image.liveuser}
						className={classes.liveUserImage}
						alt="live-user"
					/>
					<div className={classes.userOverly}>
						<Grid container>
							<Grid
								item
								container
								justifyContent="space-between"
								alignItems="center"
							>
								<Grid item>
									<div className={classes.views}>
										<img src={image.eye} alt="eye-icon" />
										<span className={classes.viewCount}>3.4k</span>
									</div>
								</Grid>
								<Grid item>
									<IconButton className={classes.vsButton}>
										<span>vs</span>
									</IconButton>
								</Grid>
							</Grid>
							<Grid item container className={classes.userInfoContainer}>
								<Grid item container justifyContent="space-between">
									<Typography className={classes.userInfo}>
										Jenna Green
									</Typography>
									<Typography className={classes.userInfo}>25</Typography>
								</Grid>
								<Grid item contianer style={{ width: "100%" }}>
									<Typography className={classes.userCity}>New York</Typography>
								</Grid>
							</Grid>
						</Grid>
					</div>
				</div>
			</Grid>
			<Grid item>
				<div className={classes.liveUser}>
					<img
						src={image.liveuser}
						className={classes.liveUserImage}
						alt="live-user"
					/>
					<div className={classes.userOverly}>
						<Grid container>
							<Grid
								item
								container
								justifyContent="space-between"
								alignItems="center"
							>
								<Grid item>
									<div className={classes.views}>
										<img src={image.eye} alt="eye-icon" />
										<span className={classes.viewCount}>3.4k</span>
									</div>
								</Grid>
							</Grid>
							<Grid item container className={classes.userInfoContainer}>
								<Grid item container justifyContent="space-between">
									<Typography className={classes.userInfo}>
										Jenna Green
									</Typography>
									<Typography className={classes.userInfo}>25</Typography>
								</Grid>
								<Grid item contianer style={{ width: "100%" }}>
									<Typography className={classes.userCity}>New York</Typography>
								</Grid>
							</Grid>
						</Grid>
					</div>
				</div>
			</Grid>
			<Grid item>
				<div className={classes.liveUser}>
					<img
						src={image.liveuser}
						className={classes.liveUserImage}
						alt="live-user"
					/>
					<div className={classes.userOverly}>
						<Grid container>
							<Grid
								item
								container
								justifyContent="space-between"
								alignItems="center"
							>
								<Grid item>
									<div className={classes.views}>
										<img src={image.eye} alt="eye-icon" />
										<span className={classes.viewCount}>3.4k</span>
									</div>
								</Grid>
								<Grid item>
									<IconButton className={classes.vsButton}>
										<span>vs</span>
									</IconButton>
								</Grid>
							</Grid>
							<Grid item container className={classes.userInfoContainer}>
								<Grid item container justifyContent="space-between">
									<Typography className={classes.userInfo}>
										Jenna Green
									</Typography>
									<Typography className={classes.userInfo}>25</Typography>
								</Grid>
								<Grid item contianer style={{ width: "100%" }}>
									<Typography className={classes.userCity}>New York</Typography>
								</Grid>
							</Grid>
						</Grid>
					</div>
				</div>
			</Grid>
		</Grid>
	);
};
