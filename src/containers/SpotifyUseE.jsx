import axios from 'axios';
import { useState, useEffect } from "react";
import Card from "../components/card";
import Input from "../components/input";
import { urlGet } from "../data/spotifyconf";

const SpotifyUseE = () => {
  const [query, setQuery] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [select, setSelect] = useState([]);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    getToken();
    getData();
  }, [query, select]);

  const getToken = () => {
    if (window.location.hash.includes("access_token")) {
      let tokenApi = window.location.hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      setToken(tokenApi);
      setAuth(true);
    } else {
      setToken("");
      setAuth(false);
    }
  };

  const getData = async () => {
    if (auth && query !== "") {
      const request = await axios
        .get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: query,
            type: "track",
          },
        })
        .then((response) => {
          combineData(response.data.tracks.items);
        })
        .catch((error) => {
          alert("Request Gagal");
          if (error.response.status === 401) {
            window.location.replace("/");
          }
        });
    }
  };

  const combineData = (data) => {
    const combine = data.map((track) => ({
      ...track,
      isSelected: select.find((sele) => sele.id === track.id),
    }));
    setData(combine);
  };

  const handleSelect = (track) => {
    const selected = select.find((sele) => sele.id === track.id);
    if (selected) {
      setSelect(select.filter((sele) => sele.id !== track.id));
    } else {
      setSelect([...select, track]);
    }
  };

  const getApiToken = window.location.hash.includes("access_token") ? (
    <div className="btn btn-success">Anda Sudah Login</div>
  ) : (
    <a href={urlGet} className="btn btn-primary mt-3">
      login
    </a>
  );

  const searchData = auth ? (
    <div className="">
      <Input get={setQuery} />
    </div>
  ) : (
    <div className="btn btn-danger">Anda Belum Login</div>
  );

  const getTrack =
    data.length > 0 ? (
      data.map((track) => {
        if (select.length > 0) {
          return (
            <Card
              key={track.id}
              data={track}
              select={handleSelect}
              isSelect={track.isSelected}
            />
          );
        } else {
          return <Card key={track.id} data={track} select={handleSelect} />;
        }
      })
    ) : (
      <div className="container d-flex justify-content-center align-content-center">
        <h1>Empty</h1>
      </div>
    );

  return (
    <div>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <div className="d-grid gap-2">
              {getApiToken}
              {searchData}
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">{getTrack}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyUseE;
