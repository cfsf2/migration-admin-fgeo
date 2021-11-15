import React from "react";
import { GET_USER } from "../../redux/actions/userActions";
import { useLocation } from "react-router-dom";

export default function EditUser(props) {
  const search = useLocation().search;
  const username = new URLSearchParams(search).get("username");

  const [editableUser, setEditableUser] = React.useState({});

  React.useEffect(() => {
    GET_USER(username).then((res) => setEditableUser(() => res));
    return;
  }, [username]);

  return <h1>Aca editamos usuarios papi</h1>;
}
