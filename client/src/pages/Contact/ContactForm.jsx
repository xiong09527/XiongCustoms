import React, { useEffect, useState } from "react";
import { MdEmail, MdLocationOn, MdNearMe } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { SEND_MESSAGE } from "../../mutations/messageMutation";
import { useMutation } from "@apollo/client";

