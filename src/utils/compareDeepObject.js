import { reduce, isPlainObject, isEqual, isArray, has } from 'lodash';

const diff = function(newObj, oldObj) {

  return reduce(newObj, function(result, value, key) {
    if (isPlainObject(value)) {
      result[key] = diff(value, oldObj[key]);

    } else if (!isEqual(value, oldObj[key])) {
      if (isArray(value)) {
        result[key] = value.map((item, index) => {
          if (oldObj[key][index]) return diff(item, oldObj[key][index]);
          return item;
        });

      } else {
        result[key] = value;
      }

    } else {
      if (key === 'id') {
        result[key] = value;
      }
    }

    return result;
  }, {});
};

const removeEmptyObject = function(obj) {
  return reduce(obj, function(result, value, key) {
    if (isPlainObject(value)) {
      if (has(value, 'id') && Object.keys(value).length > 1) {
        result[key] = removeEmptyObject(value);

      } else if (!has(value, 'id') && Object.keys(value).length > 0) {
        result[key] = removeEmptyObject(value);
      }

    } else {
      if (isArray(value)) {
        result[key] = value.map((item) => {
          if (isPlainObject(item)) {
            if (has(item, 'id') && Object.keys(item).length > 1) {
              return removeEmptyObject(item);

            } else if (!has(item, 'id') && Object.keys(item).length > 0) {
              return removeEmptyObject(item);

              //* if object has only id, push to deleteArray, will delete
            } else if(has(item, 'id') && Object.keys(item).length === 1) {
              return null;
            }
          }
          return item;
        });

        for (let i = 0; i<result[key].length; i++) {
          if (!result[key][i]) {
            result[key].splice(i, 1);
            i--;
          }
        }

      } else {
        result[key] = value;
      }
    }
    return result;
  }, {});
};

export { diff, removeEmptyObject };
