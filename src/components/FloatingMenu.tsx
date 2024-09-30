// src/components/FloatingMenu.tsx
import React from 'react';
import { Radio, Menu } from 'semantic-ui-react';

type FloatingMenuProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedWeight: string;
  setSelectedWeight: (weight: string) => void;
};

const FloatingMenu: React.FC<FloatingMenuProps> = ({ selectedCategory, setSelectedCategory, selectedWeight, setSelectedWeight }) => {
  const categories = ['All', 'Hammer and Anvil', 'Crucible of Battle', 'Search and Destroy', 'Tipping Point', 'Sweeping Engagement'];
  const weights = ['All', 'Light', 'Medium', 'Heavy'];

  return (
    <Menu vertical>
      <Menu.Item>
        <span>Category:</span>
        {categories.map((category) => (
          <Radio
            key={category}
            label={category}
            name="categoryGroup"
            value={category}
            checked={selectedCategory === category}
            onChange={() => setSelectedCategory(category)}
            style={{ display: 'block', marginTop: '5px' }}
          />
        ))}
      </Menu.Item>
      <Menu.Item>
        <span>Weight:</span>
        {weights.map((weight) => (
          <Radio
            key={weight}
            label={weight}
            name="weightGroup"
            value={weight}
            checked={selectedWeight === weight}
            onChange={() => setSelectedWeight(weight)}
            style={{ display: 'block', marginTop: '5px' }}
          />
        ))}
      </Menu.Item>
    </Menu>
  );
};

export default FloatingMenu;
