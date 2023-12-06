// Assuming you have the HTML as a string
const htmlString = `
  "https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg"
  "https://cdn.pixabay.com/photo/2018/04/09/19/55/low-poly-3305284_960_720.jpg"
  "https://cdn.pixabay.com/photo/2018/04/06/13/46/poly-3295856_960_720.png"
  "https://cdn.pixabay.com/photo/2018/03/30/15/12/dog-3275593_960_720.jpg"
  "https://cdn.pixabay.com/photo/2018/03/25/13/36/poly-3259432_1280.jpg"
  "https://cdn.pixabay.com/photo/2018/04/11/11/55/small-poly-3310321_1280.jpg"
  "https://cdn.pixabay.com/photo/2018/04/11/11/54/small-poly-3310319_1280.jpg"
  "https://cdn.pixabay.com/photo/2018/04/19/10/12/small-poly-3332792_1280.jpg"
  "https://cdn.pixabay.com/photo/2018/03/12/15/06/deer-3219872_1280.jpg"
  "https://cdn.pixabay.com/photo/2018/03/30/15/11/poly-3275592_1280.jpg"
  "https://cdn.pixabay.com/photo/2019/03/15/00/33/deer-4056199_1280.jpg"
  "https://cdn.pixabay.com/photo/2018/04/25/18/08/small-poly-3350170_1280.jpg"
  "https://cdn.pixabay.com/photo/2018/03/29/10/21/eagle-3271903_640.jpg"
  "https://cdn.pixabay.com/photo/2018/03/27/11/20/dog-3265713_640.jpg"
  "https://cdn.pixabay.com/photo/2022/03/28/01/23/cat-7096366_640.png"
  "https://cdn.pixabay.com/photo/2018/04/25/18/08/small-poly-3350168_640.jpg"
  "https://cdn.pixabay.com/photo/2019/12/25/18/19/colorful-4719046_640.jpg"
  "https://cdn.pixabay.com/photo/2018/03/14/15/26/polygon-3225500_640.jpg"
`;

const ar = htmlString.split('"');
const rs = ar
  .filter((item) => item.includes('http'))
  .map((item, index) => {
    return {
      image: item,
      price: 0.085,
      title: `PolygonAnimal #15${index}`,
    };
  });
console.log(rs);
