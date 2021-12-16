import React, { useState, useRef } from "react";
import {
  Typography,
  Button,
  IconButton,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Grid,
  Collapse,
  Slider,
} from "@material-ui/core";
import { FilterList, ExpandLess } from "@material-ui/icons";
import { useStyles } from "./filterStyles";
import image from "../../assets";

export const Filter = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [sliderValue, setSliderValue] = useState([22, 33]);
  const [age, setAge] = useState([22, 33]);
  const imgRef = useRef();
  const handleCollapse = () => {
    setCollapse(!collapse);
    imgRef.current.classList.toggle(`${classes.rotate}`);
  };
  const handleSliderAge = (event, val) => {
    setSliderValue(val);
  };
  const handleSetAge = () => {
    setAge(sliderValue);
    setCollapse(!collapse);
    imgRef.current.classList.toggle(`${classes.rotate}`);
  };
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
        <Grid item container direction="column">
          <Grid item container alignItems="center" className={classes.filter}>
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
              jus
            >
              <Typography className={classes.title}>Gender</Typography>
              <Typography className={classes.subtitle}>Female</Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            className={classes.ageFilterContainer}
          >
            <Grid
              item
              container
              className={classes.ageFilter}
              alignItems="center"
              onClick={handleCollapse}
            >
              <Grid
                item
                style={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  paddingRight: "4.5%",
                }}
                jus
              >
                <Typography className={classes.title}>Age</Typography>
                <Typography className={classes.subtitle}>
                  {age[0]}-{age[1]}
                </Typography>
              </Grid>
              <Grid item>
                <img
                  src={image.rArrow}
                  ref={imgRef}
                  className={classes.arrowIcon}
                  alt=""
                />
              </Grid>
            </Grid>
            <Collapse in={collapse} timeout="auto" unmountOnExit>
              <Slider
                onChange={handleSliderAge}
                value={sliderValue}
                defaultValue={[22, 33]}
                min={18}
                max={99}
                color="secondary"
                valueLabelDisplay="on"
                classes={{ root: classes.sliderRoot }}
              />
              <Grid item container justifyContent="flex-end">
                <Button className={classes.cancelButton} variant="text">
                  Cancel
                </Button>
                <Button
                  className={classes.setButton}
                  variant="text"
                  color="primary"
                  onClick={handleSetAge}
                >
                  Set
                </Button>
              </Grid>
            </Collapse>
          </Grid>
          <Grid item container alignItems="center" className={classes.filter}>
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
              jus
            >
              <Typography className={classes.title}>Intent</Typography>
              <Typography className={classes.subtitle}>
                Something Casual
              </Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <Grid item container alignItems="center" className={classes.filter}>
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
              jus
            >
              <Typography className={classes.title}>Religion</Typography>
              <Typography className={classes.subtitle}>Muslim</Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <Grid item container alignItems="center" className={classes.filter}>
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
              jus
            >
              <Typography className={classes.title}>Country</Typography>
              <Typography className={classes.subtitle}>Egypt</Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <Grid item container alignItems="center" className={classes.filter}>
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
              jus
            >
              <Typography className={classes.title}>Ethnicity</Typography>
              <Typography className={classes.subtitle}>
                Middle Eastren
              </Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <Grid item container alignItems="center" className={classes.filter}>
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
              jus
            >
              <Typography className={classes.title}>Height</Typography>
              <Typography className={classes.subtitle}>173cm</Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <Grid item container alignItems="center" className={classes.filter}>
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
              jus
            >
              <Typography className={classes.title}>Body Type</Typography>
              <Typography className={classes.subtitle}>Muscular</Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <Grid item container alignItems="center" className={classes.filter}>
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
              jus
            >
              <Typography className={classes.title}>Education</Typography>
              <Typography className={classes.subtitle}>
                Undergraduate
              </Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <Grid item container alignItems="center" className={classes.filter}>
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
              jus
            >
              <Typography className={classes.title}>Kids</Typography>
              <Typography className={classes.subtitle}>
                Have Children
              </Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <Grid item container alignItems="center" className={classes.filter}>
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
              jus
            >
              <Typography className={classes.title}>Drink</Typography>
              <Typography className={classes.subtitle}>Sometimes</Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <Grid item container alignItems="center" className={classes.filter}>
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
              jus
            >
              <Typography className={classes.title}>Smoke</Typography>
              <Typography className={classes.subtitle}>Yes</Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <Grid item container alignItems="center" className={classes.filter}>
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
              jus
            >
              <Typography className={classes.title}>Smoke Weed</Typography>
              <Typography className={classes.subtitle}>No</Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <Grid item container alignItems="center" className={classes.filter}>
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
              jus
            >
              <Typography className={classes.title}>Does Drugs</Typography>
              <Typography className={classes.subtitle}>Sometimes</Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
        </Grid>
        <div>
          {/* <Accordion square classes={{ root: classes.childAccordionRoot }}>
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
				</Accordion> */}
        </div>
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
