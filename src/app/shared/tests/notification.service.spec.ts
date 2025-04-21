import { NotificationService } from '../service/notification.service';

// Nhóm các test liên quan đến NotificationService
describe('NotificationService', () => {
  let service: NotificationService;

  // Thiết lập môi trường test trước mỗi test case
  beforeEach(() => {
    // Sử dụng fake timers để mock setTimeout
    jest.useFakeTimers();
    // Khởi tạo trực tiếp service mà không cần TestBed
    service = new NotificationService();
  });

  // Khôi phục timers sau mỗi test
  afterEach(() => {
    jest.useRealTimers();
  });

  // Test khởi tạo service
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test showNotification
  describe('showNotification', () => {
    it('should add a new notification to the stream', () => {
      const notificationConfig = {
        type: 'success' as const,
        title: 'Thành công',
        message: 'Đăng nhập thành công!',
        showClose: false,
        lowContrast: true,
        duration: 3000
      };

      service.showNotification(notificationConfig);

      service.notification$.subscribe(notifications => {
        expect(notifications).toHaveLength(1);
        expect(notifications[0]).toEqual({
          id: expect.any(Number),
          type: 'success',
          title: 'Thành công',
          message: 'Đăng nhập thành công!',
          showClose: false,
          lowContrast: true
        });
      });
    });

    it('should use default values for showClose and lowContrast if not provided', () => {
      const notificationConfig = {
        type: 'info' as const,
        title: 'Thông tin',
        message: 'Kiểm tra email của bạn',
        duration: 3000
      };

      service.showNotification(notificationConfig);

      service.notification$.subscribe(notifications => {
        expect(notifications).toHaveLength(1);
        expect(notifications[0]).toEqual({
          id: expect.any(Number),
          type: 'info',
          title: 'Thông tin',
          message: 'Kiểm tra email của bạn',
          showClose: true,
          lowContrast: false
        });
      });
    });

    it('should limit notifications to a maximum of 3', () => {
      const notificationConfig = {
        type: 'success' as const,
        title: 'Thành công',
        message: 'Thông báo số',
        duration: 3000
      };

      // Thêm 4 thông báo
      service.showNotification({ ...notificationConfig, message: 'Thông báo 1' });
      service.showNotification({ ...notificationConfig, message: 'Thông báo 2' });
      service.showNotification({ ...notificationConfig, message: 'Thông báo 3' });
      service.showNotification({ ...notificationConfig, message: 'Thông báo 4' });

      service.notification$.subscribe(notifications => {
        expect(notifications).toHaveLength(3);
        expect(notifications[0].message).toBe('Thông báo 2');
        expect(notifications[1].message).toBe('Thông báo 3');
        expect(notifications[2].message).toBe('Thông báo 4');
      });
    });

    it('should remove non-error notification after duration', () => {
      const notificationConfig = {
        type: 'success' as const,
        title: 'Thành công',
        message: 'Đăng nhập thành công!',
        duration: 3000
      };

      service.showNotification(notificationConfig);

      // Kiểm tra thông báo được thêm
      service.notification$.subscribe(notifications => {
        expect(notifications).toHaveLength(1);
      });

      // Tiến thời gian để kích hoạt setTimeout
      jest.advanceTimersByTime(3000);

      // Kiểm tra thông báo đã bị xóa
      service.notification$.subscribe(notifications => {
        expect(notifications).toHaveLength(0);
      });
    });

    it('should not remove error notification automatically', () => {
      const notificationConfig = {
        type: 'error' as const,
        title: 'Lỗi',
        message: 'Đăng nhập thất bại!',
        duration: 3000
      };

      service.showNotification(notificationConfig);

      // Kiểm tra thông báo được thêm
      service.notification$.subscribe(notifications => {
        expect(notifications).toHaveLength(1);
      });

      // Tiến thời gian
      jest.advanceTimersByTime(3000);

      // Kiểm tra thông báo lỗi vẫn còn
      service.notification$.subscribe(notifications => {
        expect(notifications).toHaveLength(1);
        expect(notifications[0].type).toBe('error');
      });
    });

    it('should use default duration of 5000ms if not provided', () => {
      jest.spyOn(global, 'setTimeout');

      const notificationConfig = {
        type: 'info' as const,
        title: 'Thông tin',
        message: 'Kiểm tra email của bạn'
      };

      service.showNotification(notificationConfig);

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 5000);
    });
  });

  // Test removeNotification
  describe('removeNotification', () => {
    it('should remove a specific notification by id', () => {
      const notificationConfig = {
        type: 'success' as const,
        title: 'Thành công',
        message: 'Đăng nhập thành công!',
        duration: 3000
      };

      // Thêm 2 thông báo
      service.showNotification(notificationConfig);
      let notificationId: number;
      service.notification$.subscribe(notifications => {
        notificationId = notifications[0].id;
      });

      service.showNotification({ ...notificationConfig, message: 'Thông báo 2' });

      // Xóa thông báo đầu tiên
      service.removeNotification(notificationId!);

      // Kiểm tra chỉ còn 1 thông báo
      service.notification$.subscribe(notifications => {
        expect(notifications).toHaveLength(1);
        expect(notifications[0].message).toBe('Thông báo 2');
      });
    });
  });

  // Test clearNotifications
  describe('clearNotifications', () => {
    it('should clear all notifications', () => {
      const notificationConfig = {
        type: 'success' as const,
        title: 'Thành công',
        message: 'Đăng nhập thành công!',
        duration: 3000
      };

      // Thêm 2 thông báo
      service.showNotification(notificationConfig);
      service.showNotification({ ...notificationConfig, message: 'Thông báo 2' });

      // Kiểm tra có 2 thông báo
      service.notification$.subscribe(notifications => {
        expect(notifications).toHaveLength(2);
      });

      // Xóa tất cả
      service.clearNotifications();

      // Kiểm tra không còn thông báo
      service.notification$.subscribe(notifications => {
        expect(notifications).toHaveLength(0);
      });
    });
  });
});