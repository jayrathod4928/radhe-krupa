'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

export default function ContactForm() {
    const formik = useFormik({
        initialValues: { name: '', email: '' },
        validationSchema: Yup.object({
            name: Yup.string().min(2, "Too short").required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                // Mocking API call
                await new Promise((resolve) => setTimeout(resolve, 800));
                toast.success(`Success! Message sent by ${values.name}`);
                resetForm();
            } catch (err) {
                toast.error("Failed to send message.");
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto space-y-4 p-6 bg-white shadow-md rounded-xl">
            <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                    {...formik.getFieldProps('name')}
                    className="w-full p-2 border rounded-md outline-blue-500"
                />
                {formik.touched.name && formik.errors.name && <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                    {...formik.getFieldProps('email')}
                    className="w-full p-2 border rounded-md outline-blue-500"
                />
                {formik.touched.email && formik.errors.email && <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Submit
            </button>
        </form>
    );
}