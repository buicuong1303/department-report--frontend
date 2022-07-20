import { isPlainObject, isEqual, isArray } from 'lodash';

function customCompareObject(newObj, oldObj){

  return Object.keys(newObj).reduce((total, property) => {
    
    if(isArray(newObj[property])){
      let newArray = [];
      for(let i = 0; i <  newObj[property].length; i++)
      {
        if(!isEqual(newObj[property][i], oldObj[property][i])){
          newArray.push(newObj[property][i]);
        }
      }
       
      return {...total, [property]: newArray };

    }
    else if(isPlainObject(newObj[property])){
      if(!isEqual(newObj[property], oldObj[property])){
        return {...total, [property]: newObj[property] };
      }
    }
    return total;
  }, {});

}
export {customCompareObject};
