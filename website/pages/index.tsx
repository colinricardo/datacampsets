
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import dataApi from "../api/data";
import Layout from "../components/Layout";
import { AppContext } from "../context/AppContext";
import { Card, Input, Skeleton } from "../styles/antd";
import { white } from "../styles/colors";
import { flex } from "../styles/flex";
import { screenWidthBetween, Spacer } from "../styles/responsive";
import { HeaderText, LargeText, Text } from "../styles/typography";

const Container = styled.div({
  ...flex.flex,
  ...flex.col,
  ...flex.centerColX,
  textAlign: `center`,
  minHeight: `100vh`,
});

const CourseGrid = styled.div({
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

const skeletonList = new Array(16).fill(0);

const Index = ({ pageProps }) => {
  const { courses, setCourses } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const { courses } = pageProps;

    if (courses) {
      setCourses(courses);
      setFilteredCourses(courses);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchTerm.length > 2) {
      const filteredCourses = courses.map((c) => {
        if (c["title"].toLowerCase().includes(searchTerm)) {
          return c;
        }
      }).filter((_) => !!_); // Remove undefined.

      setFilteredCourses(filteredCourses);
    } else {
      setFilteredCourses(courses);
    }
  }, [courses, searchTerm]);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const renderSearchBar = () => {
    return (
      <Input
        disabled={loading}
        placeholder="Filter..."
        size="large"
        value={searchTerm}
        style={{ width: "320px" }}
        onChange={handleSearchChange}
      />
    );
  };

  const renderCourses = () => {
    if (loading) {
      return (
        <CourseGrid>
          {skeletonList.map(() => {
            return (
              <Card
                style={{
                  width: "320px",
                  padding: "24px",
                }}>
                <div style={{
                  display: "flex",
                  height: "180px",
                  justifyContent: `center`,
                  alignItems: `center`,
                }}>
                  <Skeleton active />
                </div>
              </Card>
            );
          })}
        </CourseGrid>
      );
    }

    return (
      <CourseGrid>
        {filteredCourses.map(({ title, url }) => {
          return (
            <Card
              onClick={() => {
                const _ = `/course?courseUrl=${url}`;
                return Router.push(_, _, { shallow: false });
              }}
              style={{
                height: "180px",
                width: "320px",
                padding: "24px",
                cursor: "pointer",
              }}>
              <LargeText>{title}</LargeText>
            </Card>
          );
        })}
      </CourseGrid>
    );
  };

  return (
    <Layout pathname="/" backgroundColor={white} >
      <Container>
        <Spacer h="c" />
        <HeaderText>Welcome to Datacampsets!</HeaderText>
        <LargeText>Click into a course to view and download the datasets to use in your own projects.</LargeText>
        <LargeText>Happy learning!</LargeText>
        <Spacer h="c" />
        {renderSearchBar()}
        <Spacer h="c" />
        {renderCourses()}
        <Spacer h="c" />
      </Container>
    </Layout>
  );
};

Index.getInitialProps = async (ctx) => {
  let courses = [];

  try {
    courses = await dataApi.getCourses();
  } catch (err) {
    console.error(err);
  }

  return {
    pageProps: {
      courses,
    },
  };
};

export default Index;
