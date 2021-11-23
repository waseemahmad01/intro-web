import React, { useState } from "react";
import { useStyles } from "./gemsStyle";
import {
	Grid,
	Tabs,
	Tab,
	Box,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
} from "@material-ui/core";
import image from "../../../assets/index";
export const Gems = () => {
	const classes = useStyles();
	const [tab, setTab] = useState(0);
	const handleTab = (event, newTab) => {
		setTab(newTab);
	};
	const TabPanel = (props) => {
		const { children, value, index, ...other } = props;
		return (
			<div
				style={{ width: "100%" }}
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box p={3}>
						<Grid container style={{ paddingInline: "1rem" }}>
							{children}
						</Grid>
					</Box>
				)}
			</div>
		);
	};

	return (
		<Grid container>
			<Grid
				item
				container
				style={{
					borderBottom: "1px solid rgba(112,112,112,0.2)",
					width: "100%",
				}}
			>
				<Tabs
					className={classes.tabs}
					value={tab}
					indicatorColor="primary"
					onChange={handleTab}
					centered
				>
					<Tab
						className={classes.tab}
						icon={
							<div className={classes.tabsIcon}>
								<img src={image.gem} alt="" /> <span>215</span>
							</div>
						}
						disableRipple
						label={<span className={classes.tabLabel}>This Stream</span>}
					/>
					<Tab
						icon={
							<div className={classes.tabsIcon}>
								<img src={image.gem} alt="" /> <span>215</span>
							</div>
						}
						className={classes.tab}
						disableRipple
						label={<span className={classes.tabLabel}>This Week</span>}
					/>
					<Tab
						icon={
							<div className={classes.tabsIcon}>
								<img src={image.gem} alt="" /> <span>215</span>
							</div>
						}
						className={classes.tab}
						disableRipple
						label={<span className={classes.tabLabel}>All Time</span>}
					/>
				</Tabs>
			</Grid>
			<Grid item container>
				<TabPanel value={tab} index={0}>
					<List style={{ width: "100%" }}>
						<ListItem
							alignItems="flex-start"
							divider
							dense
							disableGutters
							className={classes.listItem}
						>
							<ListItemAvatar classes={{ root: classes.avatarRoot }}>
								<Avatar src={image.img} className={classes.avatar} />
							</ListItemAvatar>
							<ListItemText
								className={classes.listItemText}
								primary="Kaite Young"
								secondary={
									<div className={classes.secondaryText}>
										<div>
											<span className={classes.text}> Awarded : </span>
										</div>
										<div className={classes.gemCounter}>
											<img src={image.gem} alt="" /> <span>558</span>
										</div>
									</div>
								}
							/>
						</ListItem>
						<ListItem
							alignItems="flex-start"
							divider
							dense
							disableGutters
							className={classes.listItem}
						>
							<ListItemAvatar classes={{ root: classes.avatarRoot }}>
								<Avatar src={image.img} className={classes.avatar} />
							</ListItemAvatar>
							<ListItemText
								className={classes.listItemText}
								primary="Kaite Young"
								secondary={
									<div className={classes.secondaryText}>
										<div>
											<span className={classes.text}> Awarded : </span>
										</div>
										<div className={classes.gemCounter}>
											<img src={image.gem} alt="" /> <span>558</span>
										</div>
									</div>
								}
							/>
						</ListItem>
						<ListItem
							alignItems="flex-start"
							divider
							dense
							disableGutters
							className={classes.listItem}
						>
							<ListItemAvatar classes={{ root: classes.avatarRoot }}>
								<Avatar src={image.img} className={classes.avatar} />
							</ListItemAvatar>
							<ListItemText
								className={classes.listItemText}
								primary="Kaite Young"
								secondary={
									<div className={classes.secondaryText}>
										<div>
											<span className={classes.text}> Awarded : </span>
										</div>
										<div className={classes.gemCounter}>
											<img src={image.gem} alt="" /> <span>558</span>
										</div>
									</div>
								}
							/>
						</ListItem>
						<ListItem
							alignItems="flex-start"
							divider
							dense
							disableGutters
							className={classes.listItem}
						>
							<ListItemAvatar classes={{ root: classes.avatarRoot }}>
								<Avatar src={image.img} className={classes.avatar} />
							</ListItemAvatar>
							<ListItemText
								className={classes.listItemText}
								primary="Kaite Young"
								secondary={
									<div className={classes.secondaryText}>
										<div>
											<span className={classes.text}> Awarded : </span>
										</div>
										<div className={classes.gemCounter}>
											<img src={image.gem} alt="" /> <span>558</span>
										</div>
									</div>
								}
							/>
						</ListItem>
						<ListItem
							alignItems="flex-start"
							divider
							dense
							disableGutters
							className={classes.listItem}
						>
							<ListItemAvatar classes={{ root: classes.avatarRoot }}>
								<Avatar src={image.img} className={classes.avatar} />
							</ListItemAvatar>
							<ListItemText
								className={classes.listItemText}
								primary="Kaite Young"
								secondary={
									<div className={classes.secondaryText}>
										<div>
											<span className={classes.text}> Awarded : </span>
										</div>
										<div className={classes.gemCounter}>
											<img src={image.gem} alt="" /> <span>558</span>
										</div>
									</div>
								}
							/>
						</ListItem>
					</List>
				</TabPanel>
				<TabPanel value={tab} index={1}>
					<List style={{ width: "100%" }}>
						<ListItem
							alignItems="flex-start"
							divider
							dense
							disableGutters
							className={classes.listItem}
						>
							<ListItemAvatar classes={{ root: classes.avatarRoot }}>
								<Avatar src={image.img} className={classes.avatar} />
							</ListItemAvatar>
							<ListItemText
								className={classes.listItemText}
								primary="Kaite Young"
								secondary={
									<div className={classes.secondaryText}>
										<div>
											<span className={classes.text}> Awarded : </span>
										</div>
										<div className={classes.gemCounter}>
											<img src={image.gem} alt="" /> <span>558</span>
										</div>
									</div>
								}
							/>
						</ListItem>
						<ListItem
							alignItems="flex-start"
							divider
							dense
							disableGutters
							className={classes.listItem}
						>
							<ListItemAvatar classes={{ root: classes.avatarRoot }}>
								<Avatar src={image.img} className={classes.avatar} />
							</ListItemAvatar>
							<ListItemText
								className={classes.listItemText}
								primary="Kaite Young"
								secondary={
									<div className={classes.secondaryText}>
										<div>
											<span className={classes.text}> Awarded : </span>
										</div>
										<div className={classes.gemCounter}>
											<img src={image.gem} alt="" /> <span>558</span>
										</div>
									</div>
								}
							/>
						</ListItem>
						<ListItem
							alignItems="flex-start"
							divider
							dense
							disableGutters
							className={classes.listItem}
						>
							<ListItemAvatar classes={{ root: classes.avatarRoot }}>
								<Avatar src={image.img} className={classes.avatar} />
							</ListItemAvatar>
							<ListItemText
								className={classes.listItemText}
								primary="Kaite Young"
								secondary={
									<div className={classes.secondaryText}>
										<div>
											<span className={classes.text}> Awarded : </span>
										</div>
										<div className={classes.gemCounter}>
											<img src={image.gem} alt="" /> <span>558</span>
										</div>
									</div>
								}
							/>
						</ListItem>
						<ListItem
							alignItems="flex-start"
							divider
							dense
							disableGutters
							className={classes.listItem}
						>
							<ListItemAvatar classes={{ root: classes.avatarRoot }}>
								<Avatar src={image.img} className={classes.avatar} />
							</ListItemAvatar>
							<ListItemText
								className={classes.listItemText}
								primary="Kaite Young"
								secondary={
									<div className={classes.secondaryText}>
										<div>
											<span className={classes.text}> Awarded : </span>
										</div>
										<div className={classes.gemCounter}>
											<img src={image.gem} alt="" /> <span>558</span>
										</div>
									</div>
								}
							/>
						</ListItem>
						<ListItem
							alignItems="flex-start"
							divider
							dense
							disableGutters
							className={classes.listItem}
						>
							<ListItemAvatar classes={{ root: classes.avatarRoot }}>
								<Avatar src={image.img} className={classes.avatar} />
							</ListItemAvatar>
							<ListItemText
								className={classes.listItemText}
								primary="Kaite Young"
								secondary={
									<div className={classes.secondaryText}>
										<div>
											<span className={classes.text}> Awarded : </span>
										</div>
										<div className={classes.gemCounter}>
											<img src={image.gem} alt="" /> <span>558</span>
										</div>
									</div>
								}
							/>
						</ListItem>
					</List>
				</TabPanel>
				<TabPanel value={tab} index={2}>
					<List style={{ width: "100%" }}>
						<ListItem
							alignItems="flex-start"
							divider
							dense
							disableGutters
							className={classes.listItem}
						>
							<ListItemAvatar classes={{ root: classes.avatarRoot }}>
								<Avatar src={image.img} className={classes.avatar} />
							</ListItemAvatar>
							<ListItemText
								className={classes.listItemText}
								primary="Kaite Young"
								secondary={
									<div className={classes.secondaryText}>
										<div>
											<span className={classes.text}> Awarded : </span>
										</div>
										<div className={classes.gemCounter}>
											<img src={image.gem} alt="" /> <span>558</span>
										</div>
									</div>
								}
							/>
						</ListItem>
						<ListItem
							alignItems="flex-start"
							divider
							dense
							disableGutters
							className={classes.listItem}
						>
							<ListItemAvatar classes={{ root: classes.avatarRoot }}>
								<Avatar src={image.img} className={classes.avatar} />
							</ListItemAvatar>
							<ListItemText
								className={classes.listItemText}
								primary="Kaite Young"
								secondary={
									<div className={classes.secondaryText}>
										<div>
											<span className={classes.text}> Awarded : </span>
										</div>
										<div className={classes.gemCounter}>
											<img src={image.gem} alt="" /> <span>558</span>
										</div>
									</div>
								}
							/>
						</ListItem>
						<ListItem
							alignItems="flex-start"
							divider
							dense
							disableGutters
							className={classes.listItem}
						>
							<ListItemAvatar classes={{ root: classes.avatarRoot }}>
								<Avatar src={image.img} className={classes.avatar} />
							</ListItemAvatar>
							<ListItemText
								className={classes.listItemText}
								primary="Kaite Young"
								secondary={
									<div className={classes.secondaryText}>
										<div>
											<span className={classes.text}> Awarded : </span>
										</div>
										<div className={classes.gemCounter}>
											<img src={image.gem} alt="" /> <span>558</span>
										</div>
									</div>
								}
							/>
						</ListItem>
						<ListItem
							alignItems="flex-start"
							divider
							dense
							disableGutters
							className={classes.listItem}
						>
							<ListItemAvatar classes={{ root: classes.avatarRoot }}>
								<Avatar src={image.img} className={classes.avatar} />
							</ListItemAvatar>
							<ListItemText
								className={classes.listItemText}
								primary="Kaite Young"
								secondary={
									<div className={classes.secondaryText}>
										<div>
											<span className={classes.text}> Awarded : </span>
										</div>
										<div className={classes.gemCounter}>
											<img src={image.gem} alt="" /> <span>558</span>
										</div>
									</div>
								}
							/>
						</ListItem>
						<ListItem
							alignItems="flex-start"
							divider
							dense
							disableGutters
							className={classes.listItem}
						>
							<ListItemAvatar classes={{ root: classes.avatarRoot }}>
								<Avatar src={image.img} className={classes.avatar} />
							</ListItemAvatar>
							<ListItemText
								className={classes.listItemText}
								primary="Kaite Young"
								secondary={
									<div className={classes.secondaryText}>
										<div>
											<span className={classes.text}> Awarded : </span>
										</div>
										<div className={classes.gemCounter}>
											<img src={image.gem} alt="" /> <span>558</span>
										</div>
									</div>
								}
							/>
						</ListItem>
					</List>
				</TabPanel>
			</Grid>
		</Grid>
	);
};
