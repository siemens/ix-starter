/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {UseFormRegister} from "react-hook-form";
import {MockData} from "../../../../types";

type FormFieldProps = {
  id: string;
  label: string;
  register: UseFormRegister<MockData>;
}

const FormField = ({ id, label, register }: FormFieldProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        {...register(id as keyof MockData)}
      />
    </div>
  );
};

export default FormField;