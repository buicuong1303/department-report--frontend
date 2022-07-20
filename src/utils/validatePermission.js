import { intersection } from 'lodash';

//* neu kho du quyen -> return true
// export default (userPermissions = [], requestPermissions = []) => {
//   if (requestPermissions[0] === 'or') {
//     if (requestPermissions.indexOf('and') === -1) {
//       for (let i=1; i<requestPermissions.length; i++) {
//         if (userPermissions.indexOf(requestPermissions[i]) !== -1) {
//           return false;
//         }
//       }
//       return true;

//     } else {
//       let result = true;
//       for (let i=1; i<requestPermissions.indexOf('and'); i++) {
//         if (userPermissions.indexOf(requestPermissions[i]) !== -1) {
//           result = result && false;
//         }
//       } //* neu thoa dieu kien 'or' -> result=false else result=true
//       if (result) return result;

//       requestPermissions.splice(0, requestPermissions.indexOf('and')+1); //* remove items from index = 0 to index of 'and'

//       //* neu khong du quyen return true
//       return intersection(userPermissions, requestPermissions).sort().toString().replace(/[,]+/g,'') !== requestPermissions.sort().toString().replace(/[,]+/g,'');
//     }
//   }

//   //* neu khong du quyen return true
//   return intersection(userPermissions, requestPermissions).sort().toString().replace(/[,]+/g,'') !== requestPermissions.sort().toString().replace(/[,]+/g,'');
// };

export default (userPermissions = [], requestPermissions = []) => {
  if (requestPermissions[0] === 'or') { //* 'or' cac mang 'and'
    for (let i=1; i<requestPermissions.length; i++) {
      for (let j=0; j<requestPermissions[i].length+1; j++) { //* duyet qua tung phan tu trong mang [i]
        if (intersection(userPermissions, requestPermissions[i]).sort().toString().replace(/[,]+/g,'') === requestPermissions[i].sort().toString().replace(/[,]+/g,'')) {
          return false; //* chi can 1 item thoa userPermissions -> ok
        }
      }
    }
    return true;
  }

  if (requestPermissions[0] === 'and') { //* 'and' cac mang 'or'
    for (let m=1; m<requestPermissions.length; m++) {
      let result = true;
      for (let n=0; n<requestPermissions[m].length+1; n++) { //* duyet qua tung phan tu trong mang [m]
        if (userPermissions.indexOf(requestPermissions[m][n]) !== -1) { result = false; } //* chi can 1 item thuoc userPermissions -> mang[m] ok
      }
      if (result) return true; //* neu khong co item nao thuoc userPermissions -> mang[m] khong ok -> khong dat
    }
    return false;
  }

  //* mac dinh mang 'and'
  //* neu khong du quyen return true
  return intersection(userPermissions, requestPermissions).sort().toString().replace(/[,]+/g,'') !== requestPermissions.sort().toString().replace(/[,]+/g,'');
  // return false;
};
