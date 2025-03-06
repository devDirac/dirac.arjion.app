/**
=========================================================
* Otis Admin PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-admin-pro-material-dashboard-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from 'react'
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { Grid } from '@mui/material';
// @mui material componets
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Otis Admin PRO React componets
import MDBox from "../../../../componets/MDBox/index";
import MDTypography from "../../../../componets/MDTypography/index";
import { BorderBottom } from '@mui/icons-material';

function ComplexStatisticsCard({ color, title, count, percentage, percentageCerradas, percentageProceso, datas, icon, detalle }) {
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <MDBox
          variant="gradient"
          bgColor={(color || 'info')}
          
          color={(color || 'info') === "light" ? "dark" : "white"}
          coloredShadow={(color || 'info')}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        >


          {typeof icon === "string" ? (
            <Icon fontSize="default">{icon}</Icon>
          ) : (
            React.cloneElement(icon, { fontSize: "large" })
          )}

        </MDBox>
        <MDBox textAlign="right" lineHeight={1.25} style={{ cursor: 'pointer' }}  onClick={(() => {
            detalle('todas', title)
          })}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {title}
          </MDTypography>
          <MDTypography variant="h4">{count}</MDTypography>
        </MDBox>
      </MDBox>
      <Divider />
      <Grid container p={2}>
        {
          datas?.map((r,k) => (
            <Grid key={k} item xs={12} md={3} style={{ cursor: 'pointer' }} onClick={(() => {
              detalle(r?.estatus, title)
            })}>
              <MDTypography component="p" variant="button" color="text" style={{textAlign:'center'}}>
                <MDTypography
                  component="span"
                  variant="button"
                  fontWeight="bold"
                  color={'dark'}
                >
                  {r?.estatus}
                </MDTypography>
              </MDTypography>
              <MDTypography component="p" variant="button" color="text" style={{textAlign:'center'}}>
                <MDTypography
                style={{textAlign:'center'}}
                  component="span"
                  variant="button"
                  fontWeight="bold"
                  color={'dark'}
                >
                  {r?.cuenta}
                </MDTypography>
              </MDTypography>
            </Grid>
          ))
        }
      </Grid>
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
/* ComplexStatisticsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
}; */

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  /* detalle: PropTypes.any, */
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  percentageCerradas: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  percentageProceso: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  datas: PropTypes.any,
  icon: PropTypes.node.isRequired,
};

export default ComplexStatisticsCard;
