
import { useEffect, useState } from "react";
import styled from "styled-components";
import dataApi from "../api/data";
import Dataset from "../components/Dataset";
import Layout from "../components/Layout";
import { white } from "../styles/colors";
import { flex } from "../styles/flex";
import { screenWidthBetween, Spacer } from "../styles/responsive";
import { LargerText } from "../styles/typography";

const Container = styled.div({
  ...flex.flex,
  ...flex.col,
  ...flex.centerColX,
  textAlign: `center`,
  minHeight: `100vh`,
});

const DatasetGrid = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "16px",
  [screenWidthBetween("zero", "medium")]: {
    gridTemplateColumns: "1fr 1fr",
  },
  [screenWidthBetween("zero", "small")]: {
    gridTemplateColumns: "1fr",
  },
});

const Course = ({ pageProps }) => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDatasets, setCourseDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { courseData } = pageProps;

    if (courseData) {
      // @ts-ignore
      setCourseTitle(Object.keys(courseData)[0]);
      // @ts-ignore
      setCourseDatasets(Object.values(courseData)[0]);
      setLoading(false);
    }
  }, []);

  const renderDatasets = () => {
    return (
      <DatasetGrid>
        {courseDatasets.map((cd) => {
          const title = Object.keys(cd)[0];
          const url = Object.values(cd)[0];
          return <Dataset title={title} url={url} loading={loading} />;
        })}
      </DatasetGrid>
    );
  };

  return (
    <Layout pathname="/" backgroundColor={white} >
      <Container>
        <Spacer h="c" />
        {loading ? (
          <LargerText>Loading datasets</LargerText>
        ) : (
            <LargerText>Datasets for {courseTitle}</LargerText>
          )}
        <Spacer h="c" />
        {renderDatasets()}
        <Spacer h="c" />
      </Container>
    </Layout>
  );
};

Course.getInitialProps = async (ctx) => {
  const { courseUrl } = ctx.query;
  let courseData;

  try {
    courseData = await dataApi.getDataForCourseUrl(courseUrl);
  } catch (err) {
    console.error(err);
  }

  return {
    pageProps: {
      courseData,
    },
  };
};

export default Course;

