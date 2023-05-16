import { useSelector } from 'react-redux';

export default function useHelper() {
  const { user } = useSelector((state: any) => state.user);

  function hasUserAccess(acceptRoles: string[]) {
    if (!acceptRoles) {
      return true;
    }
    if (user) {
      if (!user.role) {
        return false
      }

      const navigationConfig = user.role;      
      let access = false
      
      for (const acceptRole of acceptRoles) {
        if (!navigationConfig.includes(acceptRole)) {
          access = false
          break
        }
        if (navigationConfig.includes(acceptRole)) {
          access = true
        }
      }

      return access
    }
    return false
  }

  function toBase64(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const b64 = reader.result && reader.result.replace(/^data:.+;base64,/, '');
          resolve(b64);
        }
      };
      reader.onerror = error => reject(error);
    });
  }

  function getFileData(data: FormData) {
    if (data) {
      const file = data.get('data');
      if (file && typeof file !== 'string') {
        return {
          name: file.name,
          type: file.type,
        };
      }
      return { name: 'file', type: '' };
    }
    return { name: '', type: '' };
  }

  return {
    hasUserAccess,
    toBase64,
    getFileData,
  };
}
