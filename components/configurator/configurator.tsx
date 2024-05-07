'use client';

import { useEffect, useState } from 'react';
import Select from '../UI/Select/Select';

import styles from './configurator.module.css';
import { DocumentData } from 'firebase/firestore';

export interface pcData {
  caseFormFactor: string[];
  mbFormFactor: string;
  topFans: number[];
  frontFans: number[];
  sideFans: number[];
  rearFans: number[];
  bottomFans: number[];
  fanCount: number;
  maxFanCount: number;
  topRad: number[];
  frontRad: number[];
  sideRad: number[];
  rearRad: number[];
  bottomRad: number[];
  socket: string;
  memoryType: string;
  memorySlots: number;
  coolerHeight: number;
}

const Configurator = () => {
  const [pcData, setPcData] = useState<pcData>({
    caseFormFactor: [],
    mbFormFactor: '',
    topFans: [],
    frontFans: [],
    sideFans: [],
    rearFans: [],
    bottomFans: [],
    fanCount: 0,
    maxFanCount: 0,
    topRad: [],
    frontRad: [],
    sideRad: [],
    rearRad: [],
    bottomRad: [],
    socket: '',
    memoryType: '',
    memorySlots: 0,
    coolerHeight: 0,
  });

  useEffect(() => {}, [pcData]);

  const refHandler = (productType: string, payload: DocumentData) => {
    switch (productType) {
      case 'case':
        setPcData((prevState) => {
          const caseFormFactor = payload.formFactor;
          const fanCount = payload.fanCount;
          const maxFanCount = payload.maxFanCount;
          const topRad = payload.topRadiator;
          const frontRad = payload.frontRadiator;
          const sideRad = payload.sideRadiator;
          const rearRad = payload.rearRadiator;
          const bottomRad = payload.bottomRadiator;
          const coolerHeight = payload.coolerHeight;
          return {
            ...prevState,
            caseFormFactor,
            fanCount,
            maxFanCount,
            topRad,
            frontRad,
            sideRad,
            rearRad,
            bottomRad,
            coolerHeight,
          };
        });
        break;
      case 'cpu':
        break;
      case 'cooler':
        break;
      case 'motherboard':
        setPcData((prevState) => {
          const mbFormFactor = payload.formFactor;
          const socket = payload.socket;
          const memoryType = payload.memoryType;
          const memorySlots = payload.memorySlots;

          return {
            ...prevState,
            mbFormFactor,
            socket,
            memoryType,
            memorySlots,
          };
        });
        break;
    }
  };

  return (
    <div className={styles.configurator}>
      <Select
        placeHolder='Case'
        productType='case'
        pcData={pcData}
        updateProductData={refHandler}
      />
      <Select
        placeHolder='CPU'
        productType='cpu'
        pcData={pcData}
        updateProductData={refHandler}
      />
      <Select
        placeHolder='Cooler'
        productType='cooler'
        pcData={pcData}
        updateProductData={refHandler}
      />
      <Select
        placeHolder='Motherboard'
        productType='motherboard'
        pcData={pcData}
        updateProductData={refHandler}
      />
      <Select
        placeHolder='RAM'
        productType='ram'
        pcData={pcData}
        updateProductData={refHandler}
      />

      <Select
        placeHolder='Graphics Card'
        productType='gpu'
        pcData={pcData}
        updateProductData={refHandler}
      />
      <Select
        placeHolder='Storage'
        productType='storage'
        pcData={pcData}
        updateProductData={refHandler}
      />
      <Select
        placeHolder='Power Supply'
        productType='psu'
        pcData={pcData}
        updateProductData={refHandler}
      />
    </div>
  );
};

export default Configurator;

// switch (productType) {
//   case "case":
//     setPcData((prevState) => {
//       console.log(prevState)
//       const caseStandard = payload.standard
//       const cpuMaxHeight = payload.cpuMaxHeight
//       const topRadiator = payload.topRadiator
//       const frontRadiator = payload.frontRadiator
//       const bottomRadiator = payload.bottomRadiator
//       const rearRadiator = payload.rearRadiator
//       const sideRadiator = payload.sideRadiator
//       return {
//         ...prevState,
//         caseStandard,
//         cpuMaxHeight,
//         topRadiator,
//         frontRadiator,
//         bottomRadiator,
//         rearRadiator,
//         sideRadiator,
//       }
//     })
//   case "cpu":
//     setPcData((prevState) => {
//       const platform = payload.platform
//       console.log(prevState)
//       return {
//         ...prevState,
//         platform,
//       }
//     })
// }
