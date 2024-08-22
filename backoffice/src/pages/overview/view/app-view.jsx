import { faker } from '@faker-js/faker';
import React, { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from '../../../components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import { useDispatch, useSelector } from 'react-redux';
import { fetchusers } from '../../../store/UserInfo';
import { fetchlessoncontent } from '../../../store/Lessoncontent';
import { fetchLessons } from '../../../store/lesson';
import { fetchSessions } from '../../../store/sessions';


// ----------------------------------------------------------------------

export default function AppView() {
  const users = useSelector((state) => state.userSlice.users.items)
  const lessons = useSelector((state) => state.lessonSlice.lessons.items)
  const sessions = useSelector((state) => state.sessionsSlice.sessions.items)
  const teacher = [] 
  const currentUsers=[]
  {users.map((user) =>{
              (user.role === "Teacher" &&
              
                teacher.push(user)
              
                
            )
  })
  }

   function findOcc(arr, key) {
     let arr2 = [];

     arr.forEach((x) => {
       // Checking if there is any object in arr2
       // which contains the key value
       if (
         arr2.some((val) => {
           return val[key] == x[key];
         })
       ) {
         // If yes! then increase the occurrence by 1
         arr2.forEach((k) => {
           if (k[key] === x[key]) {
             k["occurrence"]++;
           }
         });
       } else {
         // If not! Then create a new object initialize
         // it with the present iteration key's value and
         // set the occurrence to 1
         let a = {};
         a[key] = x[key];
         a["occurrence"] = 1;
         arr2.push(a);
       }
     });

     return arr2;
  } 
  currentUsers.push(findOcc(users, "address"))
    console.log(currentUsers , "adress"); 
  console.log(teacher, "Teacher")
  console.log(lessons, "users")
  const dispatch = useDispatch()
 

  
  useEffect(() => {
    dispatch(fetchusers())
    dispatch(fetchLessons())
    dispatch(fetchSessions())
  },[dispatch])

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi sfectorian, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Available sessions"
            total={sessions?.length + 1}
            color="success"
            icon={
              <lord-icon
                src="https://cdn.lordicon.com/ofcynlwa.json"
                trigger="hover"
                style={{ width: "5rem", height: "5rem" }}
              ></lord-icon>
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Users"
            total={users?.length + 1}
            color="info"
            icon={
              <lord-icon
                src="https://cdn.lordicon.com/fmasbomy.json"
                trigger="hover"
                style={{ width: "5rem", height: "5rem" }}
              ></lord-icon>
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Available lessons"
            total={lessons?.length + 1}
            color="warning"
            icon={
              <lord-icon
                src="https://cdn.lordicon.com/yhwigecd.json"
                trigger="hover"
                style={{ width: "5rem", height: "5rem" }}
              ></lord-icon>
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Teachers"
            total={teacher.length}
            color="error"
            icon={
              <lord-icon
                src="https://cdn.lordicon.com/szoiozyr.json"
                trigger="hover"
                style={{ width: "5rem", height: "5rem" }}
              ></lord-icon>
            }
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                "01/01/2003",
                "02/01/2003",
                "03/01/2003",
                "04/01/2003",
                "05/01/2003",
                "06/01/2003",
                "07/01/2003",
                "08/01/2003",
                "09/01/2003",
                "10/01/2003",
                "11/01/2003",
              ],
              series: [
                {
                  name: "Team A",
                  type: "column",
                  fill: "solid",
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: "Team B",
                  type: "area",
                  fill: "gradient",
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: "Team C",
                  type: "line",
                  fill: "solid",
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Users"
            chart={{
              series: [
                currentUsers.map((current) => (
                  {
                  label: currentUsers.address,
                  value: 5,
                  }
                )),
              ],
            }}
          />
        </Grid> */}

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: "Tunis", value: 400 },
                { label: "Sfax", value: 430 },
                { label: "Sousse", value: 448 },
                { label: "Ben arous", value: 470 },
                { label: "France", value: 540 },
                { label: "Germany", value: 580 },
                { label: "Gabes", value: 690 },
                { label: "Kef", value: 1100 },
                { label: "Manouba", value: 1200 },
                { label: "Ariana", value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: [
                "Javascript",
                "React js",
                "Node js",
                "Express Js",
                "Nest Js",
                "Prisma",
              ],
              series: [
                { name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
                { name: "Series 2", data: [20, 30, 40, 80, 20, 80] },
                { name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid> */}
        {/* 
        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                "1983, orders, $4220",
                "12 Invoices have been paid",
                "Order #37745 from September",
                "New order placed #XF-2356",
                "New order placed #XF-2346",
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: "FaceBook",
                value: 323234,
                icon: (
                  <Iconify
                    icon="eva:facebook-fill"
                    color="#1877F2"
                    width={32}
                  />
                ),
              },
              {
                name: "Google",
                value: 341212,
                icon: (
                  <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />
                ),
              },
              {
                name: "Linkedin",
                value: 411213,
                icon: (
                  <Iconify
                    icon="eva:linkedin-fill"
                    color="#006097"
                    width={32}
                  />
                ),
              },
              {
                name: "Twitter",
                value: 443232,
                icon: (
                  <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />
                ),
              },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
