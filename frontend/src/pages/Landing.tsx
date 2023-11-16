import CompanyBenefits from "components/Landing/CompanyBenefits"
import CurveDivider from "components/Landing/CurveDIvider"
import HeaderBanner from "components/Landing/HeaderBanner"
import LandingEnding from "components/Landing/LandingEnding"
import LandingNavBar from "components/Landing/LandingNavBar"
import ProductIntro from "components/Landing/ProductIntro"
import SlantedDivider from "components/Landing/SlantedDivider"
import WaveDivider from "components/Landing/WaveDivider"
import React from "react"

const Landing: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <LandingNavBar />

      <HeaderBanner />

      <div className="relative w-full mt-60">
        <SlantedDivider />
      </div>

      <ProductIntro />

      <div className="relative w-full -mt-2">
        <WaveDivider />
      </div>

      <CompanyBenefits />

      <div className="relative w-full -mt-10">
        <CurveDivider />
      </div>

      <LandingEnding />
    </div>
  )
}

export default Landing
