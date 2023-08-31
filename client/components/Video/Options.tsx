import React, { ReactNode } from 'react';

type OptionsProps = {
    children: ReactNode;
};

const Options:React.FC<OptionsProps> = ({children}) => {
    
    return <div>Options
        {children}
    </div>
}
export default Options;