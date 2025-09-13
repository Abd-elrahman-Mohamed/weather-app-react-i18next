import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

//libraries
import axios from "axios";
import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";

// MUI Components
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
moment.locale("ar");

const theme = createTheme({
  typography: {
    fontFamily: ["cairo"],
  },
});

function App() {
  const { t, i18n } = useTranslation();

  const [currentLang, setCurrentLang] = useState("ar");
  const [data, setData] = useState({
    temp: "00",
    minTemp: "00",
    maxTemp: "00",
    description: "there is non description yet",
    icon: "🔃",
  });

  function getData() {
    let updatedData = {};
    const apiLink =
      "https://api.openweathermap.org/data/2.5/weather?lat=30.87605680&lon=29.74260400&appid=62d54e0029589449c2fcf0f46c131b47";
    axios
      .get(apiLink)
      .then((response) => {
        updatedData.temp = Math.round(response.data.main.temp - 273.15);
        updatedData.minTemp = Math.round(response.data.main.temp_min - 273.15);
        updatedData.maxTemp = Math.round(response.data.main.temp_max - 273.15);
        updatedData.description = response.data.weather[0].description;
        updatedData.icon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

        setData((prev) => ({ ...prev, ...updatedData }));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  function changeLanguage() {
    if (currentLang === "en") {
      setCurrentLang("ar");
      moment.locale("ar-sa");
      i18n.changeLanguage("ar");
    } else {
      setCurrentLang("en");
      moment.locale("en");
      i18n.changeLanguage("en");
    }
  }

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* ContentContainer */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* CARD */}
            <div
              style={{
                width: "100%",
                background: "rgb(28 52 91 / 36%)",
                color: "#fff",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* Content */}
              <div>
                {/* City and time */}
                <div
                  dir={currentLang === "ar" ? "rtl" : "ltr"}
                  style={{
                    display: "flex",
                    alignItems: "end",
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: "600" }}>
                    {t("ALexandria")}
                  </Typography>

                  <Typography
                    variant="h6"
                    style={{
                      marginRight: "20px",
                      fontWeight: "400",
                    }}
                  >
                    {moment()
                      .local(currentLang === "ar" ? "ar-sa" : "en")
                      .format("dddd ,MMM D yyyy")}
                  </Typography>
                </div>
                {/* -- City and time -- */}

                <hr />
                {/* CONTAINER OF DEGREE + CLOUD ICON*/}
                <div
                  style={{
                    display: "flex",
                    direction: currentLang === "ar" ? "rtl" : "ltr",
                    justifyContent: "space-around",
                  }}
                >
                  {/* Degree & Description */}
                  <div>
                    {/* TEMP */}
                    <div>
                      <Typography
                        variant="h1"
                        sx={{
                          textAlign: currentLang === "en" ? "left" : "right",
                        }}
                      >
                        {data.temp}
                        <img src={data.icon} alt="" />
                      </Typography>
                      {/* Todo: TEMP IMG */}
                      <Typography
                        variant="h6"
                        style={{
                          textAlign: currentLang === "en" ? "left" : "right",
                        }}
                      >
                        {t(data.description)}
                      </Typography>
                    </div>
                    {/* -- TEMP -- */}
                    {/* Min - Max */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>
                        {t("Minimum temperature")} : {data.minTemp}
                      </h5>
                      <h5 style={{ margin: "0 1px" }}> | </h5>
                      <h5>
                        {t("Maximum temperature")} : {data.maxTemp}
                      </h5>
                    </div>
                  </div>
                  {/* -- Degree & Description -- */}
                  <CloudIcon sx={{ fontSize: "200px" }} />
                </div>
                {/* -- CONTAINER OF DEGREE + CLOUD ICON -- */}
              </div>
              {/* -- Content -- */}
            </div>
            {/* -- CARD -- */}
            {/* Translation Container */}
            <div
              dir={currentLang === "ar" ? "rtl" : "ltr"}
              style={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <Button
                sx={{ color: "#fff" }}
                variant="text"
                onClick={changeLanguage}
              >
                {currentLang === "en" ? "Arabic" : "الانجليزية"}
              </Button>
            </div>
            {/* -- Translation Container -- */}
          </div>
        </Container>
        {/* -- ContentContainer -- */}
      </ThemeProvider>
    </div>
  );
}

export default App;
