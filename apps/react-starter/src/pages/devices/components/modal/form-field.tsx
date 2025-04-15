/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { UseFormRegister } from "react-hook-form";
import { Device } from "../../../../types";
import { IxInput } from "@siemens/ix-react";

type FormFieldProps = {
  id: string;
  label: string;
  register: UseFormRegister<Device>;
};

const FormField = ({ id, label, register }: FormFieldProps) => {
  return <IxInput id={id} label={label} {...register(id as keyof Device)}></IxInput>;
};

export default FormField;
