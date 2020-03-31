import React, { useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { Select, Container } from './styles';

export default function AsyncSelectInput({
  name,
  label,
  options,
  loadOptions,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;
    return selectValue ? selectValue.id : '';
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  const customInputStyles = () => ({
    height: 45,
  });

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <Select
        name={fieldName}
        defaultValue={defaultValue}
        options={options}
        ref={ref}
        styles={{ input: customInputStyles }}
        classNamePrefix="react-select"
        loadOptions={loadOptions}
        {...rest}
      />
      {error && <span>{error}</span>}
    </Container>
  );
}

AsyncSelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  loadOptions: PropTypes.func.isRequired,
};

AsyncSelectInput.defaultProps = {
  label: '',
};
