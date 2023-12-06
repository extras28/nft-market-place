import React from 'react';
import PropTypes from 'prop-types';
import OSNFTCard from 'general/components/OpenSeaComponent/OSNFTCard';

DashboardHomeScreen.propTypes = {};
const testData = [
  {
    image: 'https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg',
    price: 0.085,
    title: 'PolygonAnimal #150',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2018/04/09/19/55/low-poly-3305284_960_720.jpg',
    price: 0.085,
    title: 'PolygonAnimal #151',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2018/04/06/13/46/poly-3295856_960_720.png',
    price: 0.085,
    title: 'PolygonAnimal #152',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2018/03/30/15/12/dog-3275593_960_720.jpg',
    price: 0.085,
    title: 'PolygonAnimal #153',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2018/03/25/13/36/poly-3259432_1280.jpg',
    price: 0.085,
    title: 'PolygonAnimal #154',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2018/04/11/11/55/small-poly-3310321_1280.jpg',
    price: 0.085,
    title: 'PolygonAnimal #155',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2018/04/11/11/54/small-poly-3310319_1280.jpg',
    price: 0.085,
    title: 'PolygonAnimal #156',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2018/04/19/10/12/small-poly-3332792_1280.jpg',
    price: 0.085,
    title: 'PolygonAnimal #157',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2018/03/12/15/06/deer-3219872_1280.jpg',
    price: 0.085,
    title: 'PolygonAnimal #158',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2018/03/30/15/11/poly-3275592_1280.jpg',
    price: 0.085,
    title: 'PolygonAnimal #159',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2019/03/15/00/33/deer-4056199_1280.jpg',
    price: 0.085,
    title: 'PolygonAnimal #1510',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2018/04/25/18/08/small-poly-3350170_1280.jpg',
    price: 0.085,
    title: 'PolygonAnimal #1511',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2018/03/29/10/21/eagle-3271903_640.jpg',
    price: 0.085,
    title: 'PolygonAnimal #1512',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2018/03/27/11/20/dog-3265713_640.jpg',
    price: 0.085,
    title: 'PolygonAnimal #1513',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2022/03/28/01/23/cat-7096366_640.png',
    price: 0.085,
    title: 'PolygonAnimal #1514',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2018/04/25/18/08/small-poly-3350168_640.jpg',
    price: 0.085,
    title: 'PolygonAnimal #1515',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2019/12/25/18/19/colorful-4719046_640.jpg',
    price: 0.085,
    title: 'PolygonAnimal #1516',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2018/03/14/15/26/polygon-3225500_640.jpg',
    price: 0.085,
    title: 'PolygonAnimal #1517',
  },
];

function DashboardHomeScreen(props) {
  return (
    <div className="row ">
      {testData.map((item, index) => (
        <OSNFTCard key={index} image={item.image} price={item.price} title={item.title} />
      ))}
    </div>
  );
}

export default DashboardHomeScreen;
