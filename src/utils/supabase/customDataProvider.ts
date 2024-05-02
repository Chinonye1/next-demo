import { supabase } from '@/utils/supabase/server';
import {DataProvider, Identifier } from 'react-admin';


export const customDataProvider: DataProvider = {

    getList: async (resource, params) => {
        const { data, error } = await supabase.from(resource).select();
        if (error) throw error;
        return { data, total: data.length };
    },
    getOne: async (resource, params) => {
        const { data, error } = await supabase.from(resource).select().eq('id', params.id).single();
        if (error) throw error;
        return { data };
    },
    getMany: async (resource, params) => {
        const { data, error } = await supabase.from(resource).select().in('id', params.ids);
        if (error) throw error;
        return { data };
    },
    getManyReference: async (resource, params) => {
        const { data, error } = await supabase.from(resource).select().eq(params.target, params.id);
        if (error) throw error;
        return { data, total: data.length };
    },
    update: async (resource, params) => {
        const { data, error } = await supabase.from(resource).update(params.data).eq('id', params.id);
        if (error) throw error;
        return { data } as UpdateResult<RecordType>;
    },
    updateMany: async <RecordType extends RaRecord = any>(
        resource: string, 
        params: UpdateManyParams
    ): Promise<UpdateManyResult<RecordType>> => {
        const { data, error } = await supabase.from(resource).update(params.data).in('id', params.ids);
        if (error) throw error;
        return { data: data ? (data as any[]).map((item: any) => item.id) : [] };
    },
        create: async <
        RecordType extends Omit<RaRecord, 'id'> = any,
        ResultRecordType extends RaRecord = RecordType & { id: Identifier }
    >(
        resource: string, 
        params: CreateParams
    ): Promise<CreateResult<ResultRecordType>> => {
        const { data, error } = await supabase.from(resource).insert(params.data);
        if (error) throw error;
        return { data: data?.[0] };
    },
    delete: async <RecordType extends RaRecord<Identifier> = any>(resource: string, params: DeleteParams<RecordType>): Promise<DeleteResult<RecordType | null>> => {
        const { data, error } = await supabase.from(resource).delete().eq('id', params.id);
        if (error) throw error;
        return { data };
    },
    deleteMany: async <RecordType extends RaRecord<Identifier> = any>(
        resource: string,
        params: DeleteManyParams<RecordType>
    ): Promise<DeleteManyResult<RecordType | null>> => {
        const { data, error } = await supabase.from(resource).delete().in('id', params.ids);
        if (error) throw error;
        return { data: data ? (data as any[]).map((item: any) => item.id) : [] };
    },
};