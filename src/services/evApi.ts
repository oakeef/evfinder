import Papa from 'papaparse';
import type { Vehicle } from '../types/vehicle';

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT7IkL6sNkpOuQIMnJ3KqPuwqvKLIQNJyqCE4PzfAYoEzA3yMEx2jRp1VxY4QjEDPUToQtQGtzDeuDb/pub?gid=1313510290&single=true&output=csv';


export const getEvData = () => {
  return new Promise((resolve, reject) => {
    Papa.parse<Vehicle>(GOOGLE_SHEET_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data); 
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};