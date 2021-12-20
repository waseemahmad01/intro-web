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
import { FilterDialog } from "../FilterDialog/FilterDialog";
import { CountryFilter } from "../CountryFilter/CountryFilter";
import { HeightFilter } from "../HeightFilter/HeightFilter";
import {
  religion as religionList,
  ethnicityList,
  bodyType as bodyTypeList,
  schoolDegree,
  wantChild,
} from "../../data";

const genderList = ["Female", "Male"];
const intentList = [
  "Anything",
  "Meet someone new",
  "Friends",
  "Something casual",
  "Relationship",
  "Marraige",
];

export const Filter = ({
  setGender,
  setIntent,
  setReligion,
  setEthnicity,
  setBodyType,
  setEducation,
  setKids,
  setDrink,
  setSmoke,
  setWeed,
  setDrugs,
  setCountry,
  setHeight,
  setAge,
  setFilterUpdated,
  filterUpdated,
  setIsAnyOpen,
  gender,
  intent,
  ethnicity,
  bodyType,
  religion,
  kids,
  education,
  drink,
  smoke,
  weed,
  country,
  drugs,
  height,
  age,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [sliderValue, setSliderValue] = useState([22, 33]);
  const imgRef = useRef();
  // filter dialog state
  const [openGender, setOpenGender] = useState(false);
  const [openIntent, setopenIntent] = useState(false);
  const [openReligion, setOpenReligion] = useState(false);
  const [openEthnicity, setOpenEthnicity] = useState(false);
  const [openBody, setOpenBody] = useState(false);
  const [openEducation, setOpenEducation] = useState(false);
  const [openKids, setOpenKids] = useState(false);
  const [openDrink, setOpenDrink] = useState(false);
  const [openSmoke, setOpenSmoke] = useState(false);
  const [openWeed, setOpenWeed] = useState(false);
  const [openDrugs, setOpenDrugs] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openHeight, setOpenHeight] = useState(false);
  // filter dialog state end
  const handleCollapse = () => {
    setCollapse(!collapse);
    imgRef.current.classList.toggle(`${classes.rotate}`);
  };
  const handleSliderAge = (event, val) => {
    setSliderValue(val);
  };
  const handleSetAge = () => {
    setAge(sliderValue);
    setFilterUpdated(filterUpdated + 1);
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
          <Grid
            item
            container
            onClick={() => {
              setOpenGender(true);
              setIsAnyOpen(true);
            }}
            alignItems="center"
            className={classes.filter}
          >
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
            >
              <Typography className={classes.title}>Gender</Typography>
              <Typography noWrap className={classes.subtitle}>
                {gender.length === 0 && "Select"}
                {gender.map((item, index) => {
                  if (index === gender.length - 1) {
                    return `${item}`;
                  } else {
                    return `${item}, `;
                  }
                })}
              </Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <FilterDialog
            title="Gender"
            options={genderList}
            setValue={setGender}
            open={openGender}
            onClose={setOpenGender}
            update={filterUpdated}
            setUpdate={setFilterUpdated}
            setIsAnyOpen={setIsAnyOpen}
          />
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
              >
                <Typography className={classes.title}>Age</Typography>
                <Typography noWrap className={classes.subtitle}>
                  {age.length === 0 ? "Select" : `${age[0]}-${age[1]}`}
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
                defaultValue={[18, 50]}
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
          <Grid
            item
            container
            onClick={() => {
              setopenIntent(true);
              setIsAnyOpen(true);
            }}
            alignItems="center"
            className={classes.filter}
          >
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
            >
              <Typography className={classes.title}>Intent</Typography>
              <Typography noWrap className={classes.subtitle}>
                {intent.length === 0 && "Select"}
                {intent.map((item, index) => {
                  if (index === intent.length - 1) {
                    return `${item}`;
                  } else {
                    return `${item}, `;
                  }
                })}
              </Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <FilterDialog
            title="Intent"
            options={intentList}
            setValue={setIntent}
            open={openIntent}
            onClose={setopenIntent}
            update={filterUpdated}
            setUpdate={setFilterUpdated}
            setIsAnyOpen={setIsAnyOpen}
          />
          <Grid
            item
            container
            onClick={() => {
              setOpenReligion(true);
              setIsAnyOpen(true);
            }}
            alignItems="center"
            className={classes.filter}
          >
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
            >
              <Typography className={classes.title}>Religion</Typography>
              <Typography className={classes.subtitle}>
                {religion.length === 0 && "Select"}
                {religion.map((item, index) => {
                  if (index === religion.length - 1) {
                    return `${item}`;
                  } else {
                    return `${item}, `;
                  }
                })}
              </Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <FilterDialog
            title="Religion"
            options={religionList}
            setValue={setReligion}
            open={openReligion}
            onClose={setOpenReligion}
            update={filterUpdated}
            setUpdate={setFilterUpdated}
            setIsAnyOpen={setIsAnyOpen}
          />
          <Grid
            item
            container
            onClick={() => {
              setOpenCountry(true);
              setIsAnyOpen(true);
            }}
            alignItems="center"
            className={classes.filter}
          >
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
            >
              <Typography className={classes.title}>Country</Typography>
              <Typography noWrap className={classes.subtitle}>
                {country.length === 0 && "Select"}
                {country.map((item, index) => {
                  if (index === country.length - 1) {
                    return `${item}`;
                  } else {
                    return `${item}, `;
                  }
                })}
              </Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <CountryFilter
            setValue={setCountry}
            open={openCountry}
            onClose={setOpenCountry}
            update={filterUpdated}
            setUpdate={setFilterUpdated}
            setIsAnyOpen={setIsAnyOpen}
          />
          <Grid
            item
            container
            onClick={() => {
              setOpenEthnicity(true);
              setIsAnyOpen(true);
            }}
            alignItems="center"
            className={classes.filter}
          >
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
            >
              <Typography className={classes.title}>Ethnicity</Typography>
              <Typography className={classes.subtitle}>
                {ethnicity.length === 0 && "Select"}
                {ethnicity.map((item, index) => {
                  if (index === ethnicity.length - 1) {
                    return `${item}`;
                  } else {
                    return `${item}, `;
                  }
                })}
              </Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <FilterDialog
            title="Ethnicity"
            options={ethnicityList}
            setValue={setEthnicity}
            open={openEthnicity}
            onClose={setOpenEthnicity}
            update={filterUpdated}
            setUpdate={setFilterUpdated}
            setIsAnyOpen={setIsAnyOpen}
          />
          <Grid
            item
            container
            onClick={() => {
              setOpenHeight(true);
              setIsAnyOpen(true);
            }}
            alignItems="center"
            className={classes.filter}
          >
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
            >
              <Typography className={classes.title}>Height</Typography>
              <Typography noWrap className={classes.subtitle}>
                {height[0] === undefined ? "Select" : `${height[0]}cm`}
              </Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <HeightFilter
            setContext={setHeight}
            open={openHeight}
            onClose={setOpenHeight}
            update={filterUpdated}
            setUpdate={setFilterUpdated}
            setIsAnyOpen={setIsAnyOpen}
          />
          <Grid
            item
            container
            onClick={() => {
              setOpenBody(true);
              setIsAnyOpen(true);
            }}
            alignItems="center"
            className={classes.filter}
          >
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
            >
              <Typography className={classes.title}>Body Type</Typography>
              <Typography noWrap className={classes.subtitle}>
                {bodyType.length === 0 && "Select"}
                {bodyType.map((item, index) => {
                  if (index === bodyType.length - 1) {
                    return `${item}`;
                  } else {
                    return `${item}, `;
                  }
                })}
              </Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <FilterDialog
            title="Body Type"
            options={bodyTypeList}
            setValue={setBodyType}
            open={openBody}
            onClose={setOpenBody}
            update={filterUpdated}
            setUpdate={setFilterUpdated}
            setIsAnyOpen={setIsAnyOpen}
          />
          <Grid
            item
            container
            onClick={() => {
              setOpenEducation(true);
              setIsAnyOpen(true);
            }}
            alignItems="center"
            className={classes.filter}
          >
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
            >
              <Typography className={classes.title}>Education</Typography>
              <Typography noWrap className={classes.subtitle}>
                {education.length === 0 && "Select"}
                {education.map((item, index) => {
                  if (index === education.length - 1) {
                    return `${item}`;
                  } else {
                    return `${item}, `;
                  }
                })}
              </Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <FilterDialog
            title="Education"
            options={schoolDegree}
            setValue={setEducation}
            open={openEducation}
            onClose={setOpenEducation}
            update={filterUpdated}
            setUpdate={setFilterUpdated}
            setIsAnyOpen={setIsAnyOpen}
          />
          <Grid
            item
            container
            onClick={() => {
              setOpenKids(true);
              setIsAnyOpen(true);
            }}
            alignItems="center"
            className={classes.filter}
          >
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
            >
              <Typography className={classes.title}>Kids</Typography>
              <Typography className={classes.subtitle}>
                {kids.length === 0 && "Select"}
                {kids.map((item, index) => {
                  if (index === kids.length - 1) {
                    return `${item}`;
                  } else {
                    return `${item}, `;
                  }
                })}
              </Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <FilterDialog
            title="Kids"
            options={wantChild}
            setValue={setKids}
            open={openKids}
            onClose={setOpenKids}
            update={filterUpdated}
            setUpdate={setFilterUpdated}
            setIsAnyOpen={setIsAnyOpen}
          />
          <Grid
            item
            container
            onClick={() => {
              setOpenDrink(true);
              setIsAnyOpen(true);
            }}
            alignItems="center"
            className={classes.filter}
          >
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
            >
              <Typography className={classes.title}>Drink</Typography>
              <Typography noWrap className={classes.subtitle}>
                {drink.length === 0 && "Select"}
                {drink.map((item, index) => {
                  if (index === drink.length - 1) {
                    return `${item}`;
                  } else {
                    return `${item}, `;
                  }
                })}
              </Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <FilterDialog
            title="Drink"
            options={["yes", "no", "socially"]}
            setValue={setDrink}
            open={openDrink}
            onClose={setOpenDrink}
            update={filterUpdated}
            setUpdate={setFilterUpdated}
            setIsAnyOpen={setIsAnyOpen}
          />
          <Grid
            item
            container
            onClick={() => {
              setOpenSmoke(true);
              setIsAnyOpen(true);
            }}
            alignItems="center"
            className={classes.filter}
          >
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
            >
              <Typography className={classes.title}>Smoke</Typography>
              <Typography noWrap className={classes.subtitle}>
                {smoke.length === 0 && "Select"}
                {smoke.map((item, index) => {
                  if (index === smoke.length - 1) {
                    return `${item}`;
                  } else {
                    return `${item}, `;
                  }
                })}
              </Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <FilterDialog
            title="Smoke"
            options={["yes", "no", "socially"]}
            setValue={setSmoke}
            open={openSmoke}
            onClose={setOpenSmoke}
            update={filterUpdated}
            setUpdate={setFilterUpdated}
            setIsAnyOpen={setIsAnyOpen}
          />
          <Grid
            item
            container
            onClick={() => {
              setOpenWeed(true);
              setIsAnyOpen(true);
            }}
            alignItems="center"
            className={classes.filter}
          >
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
            >
              <Typography className={classes.title}>Smoke Weed</Typography>
              <Typography noWrap className={classes.subtitle}>
                {weed.length === 0 && "Select"}
                {weed.map((item, index) => {
                  if (index === weed.length - 1) {
                    return `${item}`;
                  } else {
                    return `${item}, `;
                  }
                })}
              </Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <FilterDialog
            title="Weed"
            options={["yes", "no", "socially"]}
            setValue={setWeed}
            open={openWeed}
            onClose={setOpenWeed}
            update={filterUpdated}
            setUpdate={setFilterUpdated}
            setIsAnyOpen={setIsAnyOpen}
          />
          <Grid
            item
            container
            onClick={() => {
              setOpenDrugs(true);
              setIsAnyOpen(true);
            }}
            alignItems="center"
            className={classes.filter}
          >
            <Grid
              item
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "4.5%",
              }}
            >
              <Typography className={classes.title}>Does Drugs</Typography>
              <Typography noWrap className={classes.subtitle}>
                {drugs.length === 0 && "Select"}
                {drugs.map((item, index) => {
                  if (index === drugs.length - 1) {
                    return `${item}`;
                  } else {
                    return `${item}, `;
                  }
                })}
              </Typography>
            </Grid>
            <Grid item>
              <img src={image.rArrow} className={classes.arrowIcon} alt="" />
            </Grid>
          </Grid>
          <FilterDialog
            title="Drugs"
            options={["yes", "no", "sometimes"]}
            setValue={setDrugs}
            open={openDrugs}
            onClose={setOpenDrugs}
            update={filterUpdated}
            setUpdate={setFilterUpdated}
            setIsAnyOpen={setIsAnyOpen}
          />
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
          onClick={() => {
            setExpanded(false);
            // setIsAnyOpen(true);
          }}
          className={classes.expandLess}
        >
          <ExpandLess className={classes.expandLessIcon} />
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};
