import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { MEDICAL_API_SERVICEKEY, MEDICAL_API_URL } from '../../common/apiConfig';
import axios from 'axios';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

function MedicalChart() {

    const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: false,
    },
    title: {
      display: true,
      text: '제약회사 TOP 10',
      font: {
        weight:'bold',
        size: "18",
        color: "black"
      }
    },
  },
};

useEffect(() => {
    const sendAxios = async () => {
      var url = MEDICAL_API_URL; /*URL*/
      var queryParams = `?serviceKey=${MEDICAL_API_SERVICEKEY}`; /*Service Key*/
      queryParams += "&pageNo=1"; /**/
      queryParams += "&numOfRows=100"; /**/
      queryParams += "&type=json";

      const response = await axios.get(url + queryParams);
      console.log(response);

      const items = response.data.body.items;
      console.log(items);

      const classCount = {};
      items.forEach((item) => {
        if(classCount[item.entpName]) {
            classCount[item.entpName] += 1;
        } else {
            classCount[item.entpName] = 1;
        }
      });
      console.log(classCount);

      const sortArray = Object.entries(classCount).sort((a, b) => b[1] - a[1]);
      console.log(sortArray);

      const topTen = sortArray.slice(0,10);
      console.log(topTen);

      const keyArray = topTen.map(([name]) => name);
      const valueArray = topTen.map(([, count]) => count);

      console.log(keyArray);
      console.log(valueArray);


        const data = {
                labels: keyArray,
                datasets: [
                    {
                    label: '제약회사 TOP 10',
                    data: valueArray,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderWidth:1,
                    borderColor: 'rgb(255,0,0)',
                    },
                ],
                };
                setBarData(data);
    };
    sendAxios();
}, [])

const [barData, setBarData] = useState();


    return(
        <div className='mt-10'>
            {barData && <Bar options={options} data={barData} />}
        </div>
    );
}

export default MedicalChart;