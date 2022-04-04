import React, { Component } from "react";
import axios from "axios";
import { urlGet } from "../data/spotifyconf";
import Button from "../components/button";
import Card from "../components/card";
import Input from "../components/input";
class Spotify extends Component {
  state = {
    query: "",
    data: [],
    token: "",
    auth: false,
    avaliable: false,
  };

  setToken = () => {
    let tokenApi = window.location.hash
      .substring(1)
      .split("&")
      .find((elem) => elem.startsWith("access_token"))
      .split("=")[1];

    this.setState({
      token: tokenApi,
      auth: true,
    });
  };

  getData = async () => {
    const request = await axios
      .get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
        params: {
          q: this.state.query,
          type: "track",
        },
      })
      .then((response) => {
        this.setState({
          data: response.data,
          avaliable: true,
        });
      })
      .catch(() => {
        alert("Request Gagal");
        if (this.state.token === "") {
          window.location.replace("/");
        }
      });
  };

  setquery = (e) => {
    this.setState({
      query: e.target.value,
    });
    console.log(this.state.token);
  };
  render() {
    const { data, auth, avaliable } = this.state;
    // api token
    const getApiToken = window.location.hash.includes("access_token") ? (
      <Button select={this.setToken} name="set Token" />
    ) : (
      <a href={urlGet} className="btn btn-primary mt-3">
        login
      </a>
    );
    // search data
    const searchData = auth ? (
      <div className="">
        <Input get={this.setquery} />
        <Button select={this.getData} name="Get data" color="success" />
      </div>
    ) : (
      <div className="btn btn-danger">Token Belum diset</div>
    );
    // list track
    const track = avaliable ? (
      data.tracks.items.map((track) => <Card key={track.id} data={track} />)
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
              <div className="row">{track}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Spotify;
