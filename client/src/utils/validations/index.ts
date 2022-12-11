import { Resolver } from 'react-hook-form';
export type FormValues = {
  name: string;
};

export const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  };
};
