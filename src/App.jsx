import { useEffect } from "react";
import Prayer from "./component/Prayer";
import { useState } from "react";

function App() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [prayerDate, setPrayerDate] = useState("");
  const [city, setCity] = useState("10th of Ramadan");

  const cites = [
    { name: "العاشر من رمضان", value: "10th of Ramadan" },
    { name: "القاهرة", value: "Cairo" },
    { name: "الاسكندرية", value: "Alexandria" },
    { name: "الجيزة", value: "Giza" },
    { name: "المنصورة", value: "Mansoura" },
    { name: "الأقصر", value: "Luxor" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/13-10-2024?city=cairo&country=${city}`
          
        );
        const data_Prayer = await response.json();
        setPrayerTimes(data_Prayer.data.timings);
        setPrayerDate(data_Prayer.data.date.gregorian.date);

        console.log(data_Prayer);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [city]);


  const formateTimes = (time)=> {
    if(!time) {
      return "00:00";
    }
    else{
      let [hours, minutes] = time.split(":")
      const perd = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || hours
      return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${perd}`
    }
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="top_sec">
            <div className="city">
              <h3>المدينه</h3>
              <select name="" id="" onChange={(e)=> setCity(e.target.value)}>
                {cites.map((city) => {
                  return (
                    <option key={city.name} value={city.value}>
                      {city.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="date">
              <h3>التاريخ</h3>
              <h4>{prayerDate}</h4>
            </div>
          </div>
          <Prayer name="الفجر:" time={formateTimes(prayerTimes.Fajr)}/>
          <Prayer name="الظهر:" time={formateTimes(prayerTimes.Dhuhr)}/>
          <Prayer name="العصر:" time={formateTimes(prayerTimes.Asr)}/>
          <Prayer name="المغرب:" time={formateTimes(prayerTimes.Maghrib)}/>
          <Prayer name="العشاء:" time={formateTimes(prayerTimes.Isha)}/>
        </div>
      </section>
    </>
  );
}

export default App;
