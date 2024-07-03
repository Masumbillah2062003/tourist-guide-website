import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Overview from "./Overview";
import OurPackages from "./OurPackages";
import MeetOurTourGuides from "./MeetOurTourGuides";
import SectionTitle from "../../../Component/SectionTitle";

const TourismGuidSection = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="mt-20">
      <SectionTitle headingTitle="Tourism and Travel Guide"></SectionTitle>

      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Overview</Tab>
          <Tab> Our Packages</Tab>
          <Tab>Meet Our Tour Guides</Tab>
        </TabList>

        <TabPanel>
          <Overview></Overview>
        </TabPanel>
        <TabPanel>
          <OurPackages></OurPackages>
        </TabPanel>
        <TabPanel>
          <MeetOurTourGuides></MeetOurTourGuides>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TourismGuidSection;
