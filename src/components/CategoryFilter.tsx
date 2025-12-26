'use client';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '@/lib/store/categorySlice';
import { RootState } from '@/lib/store/store';

export default function CategoryFilter({ categories }: { categories: any[] }) {
    const dispatch = useDispatch();
    const selectedId = useSelector((state: RootState) => state.category.selectedId);

    return (
        <div className="flex gap-4 overflow-x-auto pb-4 justify-center">
            <button
                onClick={() => dispatch(setCategory(null))}
                className={`px-4 py-2 rounded-full border ${!selectedId ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
                All
            </button>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => dispatch(setCategory(cat.id))}
                    className={`px-4 py-2 rounded-full border ${selectedId === cat.id ? 'bg-black text-white' : 'bg-white text-black'}`}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
}