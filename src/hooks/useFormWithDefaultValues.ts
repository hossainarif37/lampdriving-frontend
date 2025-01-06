import { DefaultValues, FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { useEffect, useMemo } from 'react';

export function useFormWithDefaultValues<T extends FieldValues>(
    defaultValues: T,
    onResetCallback?: () => void
): UseFormReturn<T> & { modifiedFields: Partial<Record<keyof T, unknown>> } {
    const formMethods = useForm<T>({ defaultValues: defaultValues as DefaultValues<T> });

    const { watch, reset } = formMethods;
    const watchedFields = watch();

    // Reset form when defaultValues change
    useEffect(() => {
        reset(defaultValues);
        onResetCallback?.();
    }, [defaultValues, reset, onResetCallback]);

    // Utility for deep comparison
    const isEqual = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

    // Compute modified fields
    const modifiedFields = useMemo(() => {
        const diff: Partial<Record<keyof T, unknown>> = {};
        for (const key in defaultValues) {
            const currentValue = watchedFields[key as keyof T];
            const defaultValue = defaultValues[key as keyof T];

            if (!isEqual(currentValue, defaultValue)) {
                diff[key as keyof T] = currentValue;
            }
        }
        return diff;
    }, [watchedFields, defaultValues]);

    return {
        ...formMethods,
        modifiedFields,
    };
}
