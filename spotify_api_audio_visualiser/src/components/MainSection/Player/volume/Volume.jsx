import axios from 'axios';
import React, { useState } from "react";
import styled from "styled-components";

const setVolume = async (token, value) => {
  try {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: +value,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    console.error("Error setting volume:", error);
  }
};

const Volume = ({ token }) => {
  const handleSetVolume = (e) => {
    setVolume(token, e.target.value);
  };
  return (
    <Container>
      <input type="range" onMouseUp={handleSetVolume} min={0} max={100} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
`;

export default Volume;