// in src/components/AdminApp.tsx
 // remove this line if you choose Pages Router
 "use client";
import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser, fetchUtils, DataProvider, Identifier } from 'react-admin';
import {customDataProvider} from '@/utils/supabase/customDataProvider';

const AdminApp = () => (
    <Admin  dataProvider={customDataProvider}>
        <Resource name="peoples" list={ListGuesser} edit={EditGuesser} recordRepresentation="name" />
    </Admin>
);

export default AdminApp;