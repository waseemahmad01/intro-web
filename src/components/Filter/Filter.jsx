import React, { useState } from "react";
import {
	Typography,
	Button,
	IconButton,
	AccordionDetails,
	AccordionSummary,
	Accordion,
} from "@material-ui/core";
import { FilterList, ChevronRight, ExpandLess } from "@material-ui/icons";
import { useStyles } from "./filterStyles";

export const Filter = () => {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);
	return (
		<Accordion
			expanded={expanded}
			square
			classes={{ root: classes.accordionRoot }}
		>
			<AccordionSummary
				classes={{ root: classes.summary }}
				expandIcon={
					<IconButton
						onClick={() => setExpanded(!expanded)}
						className={classes.filterIconContainer}
					>
						<FilterList className={classes.filterIcon} />
					</IconButton>
				}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography className={classes.heading}>Filters</Typography>
			</AccordionSummary>
			<AccordionDetails classes={{ root: classes.details }}>
				<Accordion square classes={{ root: classes.childAccordionRoot }}>
					<AccordionSummary
						expandIcon={<ChevronRight className={classes.childAccordionIcon} />}
						classes={{ root: classes.childaccordionSummary }}
					>
						<div className={classes.childAccordionTitle}>
							<Typography className={classes.childAccordionHeading}>
								Gender
							</Typography>
							<Typography className={classes.childAccordionHeading2}>
								Female
							</Typography>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<Typography style={{ color: "#000", fontSize: "18px" }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Voluptatibus, itaque?
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion square classes={{ root: classes.childAccordionRoot }}>
					<AccordionSummary
						expandIcon={<ChevronRight className={classes.childAccordionIcon} />}
						classes={{ root: classes.childaccordionSummary }}
					>
						<div className={classes.childAccordionTitle}>
							<Typography className={classes.childAccordionHeading}>
								Age
							</Typography>
							<Typography className={classes.childAccordionHeading2}>
								23-32
							</Typography>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<Typography style={{ color: "#000", fontSize: "18px" }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Voluptatibus, itaque?
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion square classes={{ root: classes.childAccordionRoot }}>
					<AccordionSummary
						expandIcon={<ChevronRight className={classes.childAccordionIcon} />}
						classes={{ root: classes.childaccordionSummary }}
					>
						<div className={classes.childAccordionTitle}>
							<Typography className={classes.childAccordionHeading}>
								Intent
							</Typography>
							<Typography className={classes.childAccordionHeading2}>
								Something Casual
							</Typography>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<Typography style={{ color: "#000", fontSize: "18px" }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Voluptatibus, itaque?
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion square classes={{ root: classes.childAccordionRoot }}>
					<AccordionSummary
						expandIcon={<ChevronRight className={classes.childAccordionIcon} />}
						classes={{ root: classes.childaccordionSummary }}
					>
						<div className={classes.childAccordionTitle}>
							<Typography className={classes.childAccordionHeading}>
								Religion
							</Typography>
							<Typography className={classes.childAccordionHeading2}>
								Islam
							</Typography>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<Typography style={{ color: "#000", fontSize: "18px" }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Voluptatibus, itaque?
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion square classes={{ root: classes.childAccordionRoot }}>
					<AccordionSummary
						expandIcon={<ChevronRight className={classes.childAccordionIcon} />}
						classes={{ root: classes.childaccordionSummary }}
					>
						<div className={classes.childAccordionTitle}>
							<Typography className={classes.childAccordionHeading}>
								Country
							</Typography>
							<Typography className={classes.childAccordionHeading2}>
								Pakistan
							</Typography>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<Typography style={{ color: "#000", fontSize: "18px" }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Voluptatibus, itaque?
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion square classes={{ root: classes.childAccordionRoot }}>
					<AccordionSummary
						expandIcon={<ChevronRight className={classes.childAccordionIcon} />}
						classes={{ root: classes.childaccordionSummary }}
					>
						<div className={classes.childAccordionTitle}>
							<Typography className={classes.childAccordionHeading}>
								Ethnicity
							</Typography>
							<Typography className={classes.childAccordionHeading2}>
								Middle Eastren
							</Typography>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<Typography style={{ color: "#000", fontSize: "18px" }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Voluptatibus, itaque?
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion square classes={{ root: classes.childAccordionRoot }}>
					<AccordionSummary
						expandIcon={<ChevronRight className={classes.childAccordionIcon} />}
						classes={{ root: classes.childaccordionSummary }}
					>
						<div className={classes.childAccordionTitle}>
							<Typography className={classes.childAccordionHeading}>
								Height
							</Typography>
							<Typography className={classes.childAccordionHeading2}>
								182cm
							</Typography>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<Typography style={{ color: "#000", fontSize: "18px" }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Voluptatibus, itaque?
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion square classes={{ root: classes.childAccordionRoot }}>
					<AccordionSummary
						expandIcon={<ChevronRight className={classes.childAccordionIcon} />}
						classes={{ root: classes.childaccordionSummary }}
					>
						<div className={classes.childAccordionTitle}>
							<Typography className={classes.childAccordionHeading}>
								Body Type
							</Typography>
							<Typography className={classes.childAccordionHeading2}>
								Muscular
							</Typography>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<Typography style={{ color: "#000", fontSize: "18px" }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Voluptatibus, itaque?
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion square classes={{ root: classes.childAccordionRoot }}>
					<AccordionSummary
						expandIcon={<ChevronRight className={classes.childAccordionIcon} />}
						classes={{ root: classes.childaccordionSummary }}
					>
						<div className={classes.childAccordionTitle}>
							<Typography className={classes.childAccordionHeading}>
								Education
							</Typography>
							<Typography className={classes.childAccordionHeading2}>
								Undergrade
							</Typography>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<Typography style={{ color: "#000", fontSize: "18px" }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Voluptatibus, itaque?
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion square classes={{ root: classes.childAccordionRoot }}>
					<AccordionSummary
						expandIcon={<ChevronRight className={classes.childAccordionIcon} />}
						classes={{ root: classes.childaccordionSummary }}
					>
						<div className={classes.childAccordionTitle}>
							<Typography className={classes.childAccordionHeading}>
								Kids
							</Typography>
							<Typography className={classes.childAccordionHeading2}>
								Have Kids
							</Typography>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<Typography style={{ color: "#000", fontSize: "18px" }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Voluptatibus, itaque?
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion square classes={{ root: classes.childAccordionRoot }}>
					<AccordionSummary
						expandIcon={<ChevronRight className={classes.childAccordionIcon} />}
						classes={{ root: classes.childaccordionSummary }}
					>
						<div className={classes.childAccordionTitle}>
							<Typography className={classes.childAccordionHeading}>
								Drink
							</Typography>
							<Typography className={classes.childAccordionHeading2}>
								Sometimes
							</Typography>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<Typography style={{ color: "#000", fontSize: "18px" }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Voluptatibus, itaque?
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion square classes={{ root: classes.childAccordionRoot }}>
					<AccordionSummary
						expandIcon={<ChevronRight className={classes.childAccordionIcon} />}
						classes={{ root: classes.childaccordionSummary }}
					>
						<div className={classes.childAccordionTitle}>
							<Typography className={classes.childAccordionHeading}>
								Smoke
							</Typography>
							<Typography className={classes.childAccordionHeading2}>
								Yes
							</Typography>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<Typography style={{ color: "#000", fontSize: "18px" }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Voluptatibus, itaque?
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion square classes={{ root: classes.childAccordionRoot }}>
					<AccordionSummary
						expandIcon={<ChevronRight className={classes.childAccordionIcon} />}
						classes={{ root: classes.childaccordionSummary }}
					>
						<div className={classes.childAccordionTitle}>
							<Typography className={classes.childAccordionHeading}>
								Smoke Weed
							</Typography>
							<Typography className={classes.childAccordionHeading2}>
								No
							</Typography>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<Typography style={{ color: "#000", fontSize: "18px" }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Voluptatibus, itaque?
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion square classes={{ root: classes.childAccordionRoot }}>
					<AccordionSummary
						expandIcon={<ChevronRight className={classes.childAccordionIcon} />}
						classes={{ root: classes.childaccordionSummary }}
					>
						<div className={classes.childAccordionTitle}>
							<Typography className={classes.childAccordionHeading}>
								Does Drugs
							</Typography>
							<Typography className={classes.childAccordionHeading2}>
								Sometimes
							</Typography>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<Typography style={{ color: "#000", fontSize: "18px" }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Voluptatibus, itaque?
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Button
					disableRipple
					variant="text"
					onClick={() => setExpanded(false)}
					className={classes.expandLess}
				>
					<ExpandLess className={classes.expandLessIcon} />
				</Button>
			</AccordionDetails>
		</Accordion>
	);
};
