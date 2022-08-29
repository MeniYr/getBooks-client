import React, { useEffect, useState } from "react";
import { USERS } from "../constants/globalinfo/URL`S";
import { doApiGet, doApiMethod } from "../services/apiService";

export default function UseExist_notify(notify) {
  const [isExist, setIsExist] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(notify);
    doApiGet(`${USERS}/userId/${notify.toUserId}`)
      .then((resp) => {
        console.log(resp.data);
        console.log(
          resp.data.notifications
            .find((item) => item.bookID === notify.bookID)
            ?.interestedUsersID?.includes(notify.fromUserId)
        );
        setIsExist(
          resp.data.notifications
            .find((item) => item.bookID === notify.bookID)
            ?.interestedUsersID?.includes(notify.fromUserId)
        );
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      });
    setLoading(false);
  }, [notify]);

  return { loading, error, isExist };
}
