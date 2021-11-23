import React, { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import image from "../../assets/index";
import {
	makeStyles,
	IconButton,
	Dialog,
	Grid,
	Avatar,
} from "@material-ui/core";
import { ChevronRight, ChevronLeft } from "@material-ui/icons";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

const useStyles = makeStyles((theme) => ({


	dialogContainer: {
		height: "1018px",
		width: "543px",
		padding: "0.5rem",
		[theme.breakpoints.down("lg")]: {
			height: "500px",
			width: "270px",
			padding: "0.25rem",
		},
	},
	dialog: {
		"& .MuiDialog-container": {
			backgroundColor: "rgba(0,0,0,0.8)",
		},
		"& .MuiDialog-paper": {
			borderRadius: "35px",
			backgroundImage: "linear-gradient( #654AAB,#E77783)",
			[theme.breakpoints.down("lg")]: {
				borderRadius: "25px",
			},
		},
	},
	content: {
		width: "100%",
		height: "100%",
		background: "#fff",
		borderRadius: "35px",
		overflow: "hidden",
		position: "relative",
		[theme.breakpoints.down("lg")]: {
			borderRadius: "25px",
		},
	},
	story: {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	},
	profile: {
		position: "absolute",
		top: "2rem",
		left: "2rem",
		[theme.breakpoints.down("lg")]: {
			top: "0.5rem",
			left: "0.5rem",
		},
	},
	backButton: {
		height: "40px",
		width: "40px",
		marginBottom: "1.5rem",
		[theme.breakpoints.down("lg")]: {
			height: "25px",
			width: "25px",
			marginBottom: "1.4rem",
		},
	},
	backIcon: {
		color: "#fff",
		fontSize: "2.5rem",
		[theme.breakpoints.down("lg")]: {
			fontSize: "1.25rem",
		},
	},
	profilePic: {
		height: "90px",
		width: "90px",
		border: `3px solid ${theme.palette.common.crimson}`,
		[theme.breakpoints.down("lg")]: {
			height: "60px",
			width: "60px",
		},
	},
	username: {
		color: "#fff",
		fontSize: "22px",
		[theme.breakpoints.down("lg")]: {
			fontSize: "12px",
		},
	},
	arrowContainer: {
		position: "absolute",
		top: "50%",
		width: "100%",
		marginTop: "-2%",
		display: "flex",
		justifyContent: "space-between",
		padding: "0 1rem",
		[theme.breakpoints.down("lg")]: {
			padding: "0rem 0.25rem",
		},
	},
	storyIcon: {
		height: "42px ",
		width: "42px",
		backgroundColor: theme.palette.primary.main,
		"&:hover": {
			backgroundColor: theme.palette.primary.light,
		},
		[theme.breakpoints.down("lg")]: {
			height: "25px",
			width: "25px",
		},
	},
	storyButtonIcon: {
		color: "#fff",
		fontSize: "1.7rem",
		fontWeight: "700",
		[theme.breakpoints.down("lg")]: {
			fontSize: "1.2rem",
		},
	},
	image: {
		height: '160px',
		width: '160px',
		border: `3px solid ${theme.palette.common.crimson}`,
		borderRadius: "50%",
		cursor: "pointer",
		[theme.breakpoints.down("lg")]:{

			height: '115px',
			width: '115px'
		}
	},
	root: {
		"& .splide__arrow": {
			backgroundColor: theme.palette.primary.main,
			opacity: 1,
			fill: "#ffffff",
			fontSize: "1.25rem",
			[theme.breakpoints.down("lg")]:{
				fontSize: "0.75rem"
			}
		},
		"& .splide__arrow--prev": {
			left: "-0.8rem",
			[theme.breakpoints.down("lg")]:{

				left: "-0.7rem",
			},
		},
		"& .splide__arrow--next": {
			right: "0.1rem",
			[theme.breakpoints.down("lg")]:{

				right: "-0.2rem",
			}
		}
	}
}));

export const StorySlider = () => {
	const classes = useStyles();
	const [openDialog, setOpenDialog] = useState(false);
	const handleClick = () => {
		setOpenDialog(true);
	};

	return (
		<>
			<div className={classes.root}>

			<Splide options={{
				type: "loop",
				perPage: 8,
				perMove: 1,
				pagination: false,
			}}>
				<SplideSlide>
				<img src={image.img} className={classes.image} onClick={handleClick} alt="" />
				</SplideSlide>
				<SplideSlide>
				<img src={image.img} className={classes.image} onClick={handleClick} alt="" />
				</SplideSlide>
				<SplideSlide>
				<img src={image.img} className={classes.image} onClick={handleClick} alt="" />
				</SplideSlide>
				<SplideSlide>
				<img src={image.img} className={classes.image} onClick={handleClick} alt="" />
				</SplideSlide>
				<SplideSlide>
				<img src={image.img} className={classes.image} onClick={handleClick} alt="" />
				</SplideSlide>
				<SplideSlide>
				<img src={image.img} className={classes.image} onClick={handleClick} alt="" />
				</SplideSlide>
				<SplideSlide>
				<img src={image.img} className={classes.image} onClick={handleClick} alt="" />
				</SplideSlide>
				<SplideSlide>
				<img src={image.img} className={classes.image} onClick={handleClick} alt="" />
				</SplideSlide>
				<SplideSlide>
				<img src={image.img} className={classes.image} onClick={handleClick} alt="" />
				</SplideSlide>
				<SplideSlide>
				<img src={image.img} className={classes.image} onClick={handleClick} alt="" />
				</SplideSlide>
			</Splide>
		</div>
			<Dialog
				className={classes.dialog}
				open={openDialog}
				onClose={() => setOpenDialog(false)}
			>
				<Grid container className={classes.dialogContainer}>
					<Grid item container className={classes.content}>
						<img src={image.storyImg} className={classes.story} alt="" />
						<Grid container alignItems="center" className={classes.profile}>
							<Grid item>
								<IconButton
									onClick={() => setOpenDialog(false)}
									className={classes.backButton}
								>
									<ChevronLeft className={classes.backIcon} />
								</IconButton>
							</Grid>
							<Grid item contianer direction="column" alignItems="center">
								<Grid item>
									<Avatar className={classes.profilePic} src={image.img} />
								</Grid>
								<Grid item>
									<span className={classes.username}>@username</span>
								</Grid>
							</Grid>
						</Grid>
						<div className={classes.arrowContainer}>
							<div>
								<IconButton className={classes.storyIcon}>
									<ChevronLeft className={classes.storyButtonIcon} />
								</IconButton>
							</div>
							<div>
								<IconButton className={classes.storyIcon}>
									<ChevronRight className={classes.storyButtonIcon} />
								</IconButton>
							</div>
						</div>
					</Grid>
				</Grid>
			</Dialog>
		</>
	);
};
