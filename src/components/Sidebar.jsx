import React, { useState } from 'react';
import { Drawer, Avatar, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { HomeOutlined, FitnessCenter, Spa, LocalDining, Storefront, Group, StarOutline, Settings } from '@mui/icons-material';

const Sidebar = ({ open, toggleDrawer, user }) => {
  const [selectedItem, setSelectedItem] = useState(0);

  const items = [
    { label: 'Home', icon: <HomeOutlined />, link: '/' },
    { label: 'Virtual Trainer', icon: <FitnessCenter />, link: '/virtual-trainer' },
    { label: 'Mindfulness', icon: <Spa />, link: '/mindfulness' },
    { label: 'Diet And Nutrition', icon: <LocalDining />, link: '/diet-and-nutrition' },
    { label: 'Marketplace', icon: <Storefront />, link: '/marketplace' },
    { label: 'Community', icon: <Group />, link: '/community' },
    { label: 'Join Premium', icon: <StarOutline />, link: '/pricing' },
    { label: 'Settings', icon: <Settings />, link: '/profile' },
  ];

  return (
    <Drawer variant={open ? "permanent" : "temporary"} open={open} style={{ width: '110px', backgroundColor: '#000000' }}>
      <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '32px' }}>
        <Avatar style={{ backgroundColor: 'white', width: '80px', height: '80px', margin: '0 auto' }}>
          <IconButton style={{ color: '#000000' }}>
            {/* Basket Icon */}
          </IconButton>
        </Avatar>
      </div>
      
      <List style={{ backgroundColor: '#151515', borderRadius: '15px', margin: '0 16px', padding: '16px 0' }}>
        {items.map((item, index) => (
          <a href={item.link} className='text-decoration-none'>
            <ListItem button key={index} onClick={() => setSelectedItem(index)} style={{ justifyContent: 'center' }}>
              <ListItemIcon style={{ color: selectedItem === index ? 'white' : 'grey' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} style={{ color: selectedItem === index ? 'white' : 'grey' }} />
            </ListItem>
          </a>
        ))}
      </List>

      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
        <a href='/profile'>
          <Avatar src="https://cdn.vuetifyjs.com/images/lists/1.jpg" style={{ border: '1px solid white' }} />
        </a>
      </div>
    </Drawer>
  );
};

export default Sidebar;
