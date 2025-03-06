import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { StoreType } from "../types/geericTypes";
import ModalComponent from "../componets/Modal";
import { Alert, Grid, Snackbar, Stack } from "@mui/material";
import Echo from "laravel-echo";
import { pusherCondig } from "../config/webSockets";
import moment from "moment";


interface PrivateRouterProps {
  path: string;
}

const PrivateRouter: React.FC<PrivateRouterProps> = (
  props: PrivateRouterProps
) => {
  return <Outlet />;
};

export default PrivateRouter;