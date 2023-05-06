import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AssignedCoursesTable from "../../../Components/User/Courses/AssignedCoursesTable";
import CompletedCoursesTable from "../../../Components/User/Courses/CompletedCoursesTable";


const UserCourses = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" , marginTop:'3rem'}}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Assigned Courses" />
        <Tab label="Completed Courses" />
      </Tabs>
      {value === 0 && <AssignedCoursesTable />}{" "}
      {/* Render AssignedCoursesTable component when Assigned Courses tab is selected */}
      {value === 1 && <CompletedCoursesTable />}{" "}
      {/* Render CompletedCoursesTable component when Completed Courses tab is selected */}
    </Box>
  );
};

export default UserCourses;
