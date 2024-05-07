import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './Select.module.css';
import {
  DocumentData,
  DocumentReference,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../app/firebase';

import { pcData } from '../../configurator/configurator';

interface Options {
  id: string;
  ref: DocumentReference<DocumentData, DocumentData>;
  data: DocumentData;
}

interface Props {
  placeHolder: string;
  productType: string;
  pcData: pcData;
  updateProductData: (productType: string, payload: DocumentData) => void;
}

const Select = ({
  placeHolder,
  productType,
  pcData,
  updateProductData,
}: Props) => {
  const [text, setText] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const [options, setOptions] = useState<Options[] | []>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const nameFilter = where('name', 'array-contains', text.toUpperCase());

      const productRef = text
        ? await query(collection(db, productType), nameFilter)
        : await query(collection(db, productType));

      const productList = (await getDocs(productRef)).docs.map((doc) => {
        return {
          id: doc.id.replaceAll('-', ' '),
          ref: doc.ref,
          data: doc.data(),
        };
      });

      let filteredList;

      switch (productType) {
        case 'case':
          if (pcData.mbFormFactor) {
            filteredList = productList.filter((product) => {
              const formFactorList: string[] = product.data.formFactor;
              if (formFactorList) {
                if (formFactorList.includes(pcData.mbFormFactor)) return true;
              }
            });
            setOptions(filteredList);
          } else {
            setOptions(productList);
          }
          break;
        case 'cpu':
          if (pcData.socket) {
            filteredList = productList.filter((product) => {
              const socket: string = product.data.socket;

              if (socket === pcData.socket) return true;
            });
            setOptions(filteredList);
          } else {
            setOptions(productList);
          }
          break;
        case 'cooler':
          setOptions(productList);
          break;
        case 'motherboard':
          setOptions(productList);
          break;
      }

      console.log(1, filteredList);
      // setOptions(productList);
    };

    fetchProduct();
  }, [text, focused]);

  const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const onFocusHandler = () => {
    setFocused(true);
  };

  const onBlurHandler = () => {
    setFocused(false);
    setOptions([]);
  };

  const refHandler = (ref: DocumentData, refId: string) => {
    updateProductData(productType, ref);
    setText(refId.replaceAll('-', ' '));
    onBlurHandler();
  };

  return (
    <div className={styles.Select}>
      <input
        type='text'
        autoComplete='off'
        placeholder={placeHolder}
        onFocus={onFocusHandler}
        // onBlur={onBlurHandler}
        onChange={inputHandler}
        value={text}
      />
      <div className={`${focused ? styles.Shown : ''} ${styles.Options}`}>
        {options.map((option) => {
          return (
            <div
              key={option.id}
              className={styles.Option}
              onClick={() => refHandler(option.data, option.id)}
            >
              {option.id}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Select;
