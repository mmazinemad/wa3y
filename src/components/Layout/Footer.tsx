import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} <span className='font-bold text-primary'>واعي | Wise.</span> جميع الحقوق محفوظة.</p>
          <p>Developed By <a target='_blank' rel='noopener noreferrer' className='font-bold text-primary' href="https://mazin-emad.netlify.app">Mazin Emad</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
