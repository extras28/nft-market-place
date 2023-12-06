import React from 'react';
import PropTypes from 'prop-types';
import OSNFTCard from 'general/components/OpenSeaComponent/OSNFTCard';

DashboardHomeScreen.propTypes = {};

function DashboardHomeScreen(props) {
  return (
    <div className="row ">
      <OSNFTCard
        image="https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg"
        price={0.085}
        title="Sprotoanimal #1514"
      />
      <OSNFTCard
        image="https://cdn.pixabay.com/photo/2018/04/09/19/55/low-poly-3305284_960_720.jpg"
        price={0.085}
        title="Sprotoanimal #1515"
      />
      <OSNFTCard
        image="https://cdn.pixabay.com/photo/2018/04/06/13/46/poly-3295856_960_720.png"
        price={0.085}
        title="Sprotoanimal #1516"
      />
      <OSNFTCard
        image="https://cdn.pixabay.com/photo/2018/03/30/15/12/dog-3275593_960_720.jpg"
        price={0.085}
        title="Sprotoanimal #1517"
      />
      <OSNFTCard
        image="https://cdn.pixabay.com/photo/2018/03/25/13/36/poly-3259432_1280.jpg"
        price={0.085}
        title="Sprotoanimal #1517"
      />
      <OSNFTCard
        image="https://cdn.pixabay.com/photo/2018/04/11/11/55/small-poly-3310321_1280.jpg"
        price={0.085}
        title="Sprotoanimal #1517"
      />
      <OSNFTCard
        image="https://cdn.pixabay.com/photo/2018/04/11/11/54/small-poly-3310319_1280.jpg"
        price={0.085}
        title="Sprotoanimal #1517"
      />
      <OSNFTCard
        image="https://cdn.pixabay.com/photo/2018/04/19/10/12/small-poly-3332792_1280.jpg"
        price={0.085}
        title="Sprotoanimal #1517"
      />
      <OSNFTCard
        image="https://cdn.pixabay.com/photo/2018/03/12/15/06/deer-3219872_1280.jpg"
        price={0.085}
        title="Sprotoanimal #1517"
      />
      <OSNFTCard
        image="https://cdn.pixabay.com/photo/2018/03/30/15/11/poly-3275592_1280.jpg"
        price={0.085}
        title="Sprotoanimal #1517"
      />
      <OSNFTCard
        image="https://cdn.pixabay.com/photo/2019/03/15/00/33/deer-4056199_1280.jpg"
        price={0.085}
        title="Sprotoanimal #1517"
      />
      <OSNFTCard
        image="https://cdn.pixabay.com/photo/2018/04/25/18/08/small-poly-3350170_1280.jpg"
        price={0.085}
        title="Sprotoanimal #1517"
      />
    </div>
  );
}

export default DashboardHomeScreen;
