'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';

interface IOrganization {
  id: number;
  name: string;
  yearfounded: number;
  category: string;
  contactfirstname: string;
  contactlastname: string;
  contactphone: string;
  contactemail: string;
  websiteurl: string;
  facebookurl?: string;
  instagramurl?: string;
  about: string;
  logo: string;
}

export default function Home() {
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await axios.get('/api/get-organizations');
        setOrganizations(res.data.organizations.rows);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  console.log('organizations: ', organizations)
  
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 style={{fontSize: '25px !important', paddingBottom: 30}}>NEXT.JS Playground</h1>
      <ul>
        {organizations.map(({id, name, yearfounded, category, contactfirstname, contactlastname, contactphone, contactemail, websiteurl, facebookurl, instagramurl, about}) => (
          <div key={id} style={{paddingBottom: 20}}>
            <li>
              <p>Organization: {name}</p>
              <p>Year Founded: {yearfounded}</p>
              <p>Category: {category}</p>
              <p>About: {about}</p>
              <p>Contact`s Name: {contactfirstname} {contactlastname}</p>
              <p>Contact`s Phone: {contactphone}</p>
              <p>Contact`s Email: {contactemail}</p>
              <p>Website: <a href={websiteurl} target='_blank'>{websiteurl}</a></p>
              <p>Facebook: <a href={facebookurl} target='_blank'>{facebookurl}</a></p>
              <p>Instagram: <a href={instagramurl} target='_blank'>{instagramurl}</a></p>
            </li>
          </div>
        ))}
      </ul>
    </main>
  );
}
